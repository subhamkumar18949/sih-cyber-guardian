from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from web3 import Web3
import json
import os
import tempfile
from dotenv import load_dotenv
from transformers import pipeline
import hashlib
from PIL import Image
import io
import cv2
import numpy as np
import networkx as nx
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from datetime import datetime
from bson import ObjectId
import shutil

# --- SETUP ---
load_dotenv()
app = FastAPI(title="Cyber Guardian API - Memory Optimized")

# Create uploads directory if it doesn't exist
UPLOADS_DIR = "uploads"
os.makedirs(UPLOADS_DIR, exist_ok=True)

# Mount the 'uploads' directory to serve static files
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# --- CORS MIDDLEWARE ---
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATABASE SETUP ---
MONGO_URI = os.getenv("MONGO_URI")
client = MongoClient(MONGO_URI)
db = client.cyber_guardian
threat_collection = db.threat_reports
print("Connected to MongoDB.")

# --- AI MODEL SETUP (LAZY LOADING) ---
# We declare them as None. They will be loaded only when first used.
ai_gen_detector = None
toxicity_detector = None
sentiment_detector = None
clip_classifier = None

def get_ai_gen_detector():
    global ai_gen_detector
    if ai_gen_detector is None:
        print("Loading custom AI-gen detector for the first time...")
        ai_gen_detector = pipeline("text-classification", model="subham18949/sih-cyber-guardian-detector")
    return ai_gen_detector

def get_toxicity_detector():
    global toxicity_detector
    if toxicity_detector is None:
        print("Loading toxicity detector for the first time...")
        toxicity_detector = pipeline("text-classification", model="martin-ha/toxic-comment-model")
    return toxicity_detector
    
def get_sentiment_detector():
    global sentiment_detector
    if sentiment_detector is None:
        print("Loading sentiment detector for the first time...")
        sentiment_detector = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
    return sentiment_detector

def get_clip_classifier():
    global clip_classifier
    if clip_classifier is None:
        print("Loading CLIP classifier for the first time...")
        clip_classifier = pipeline("zero-shot-image-classification", model="openai/clip-vit-large-patch14")
    return clip_classifier

# --- BLOCKCHAIN SETUP ---
RPC_URL = os.getenv("RPC_URL")
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
WALLET_ADDRESS = os.getenv("WALLET_ADDRESS")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")

try:
    with open("../sih2/out/AlertContract.sol/AlertContract.json") as f:
        contract_json = json.load(f)
        CONTRACT_ABI = contract_json['abi']
    print("Contract ABI loaded successfully.")
    w3 = Web3(Web3.HTTPProvider(RPC_URL))
    contract = w3.eth.contract(address=CONTRACT_ADDRESS, abi=CONTRACT_ABI)
    print("Connected to blockchain.")
except Exception as e:
    print(f"Error loading contract ABI: {e}. Blockchain features will be disabled.")
    contract = None

# --- Reusable Blockchain Function ---
def log_threat_to_blockchain(content_hash: str):
    if not contract: return None
    try:
        print(f"High-risk threat detected! Logging hash to blockchain...")
        gas_estimate = contract.functions.createAlert(content_hash).estimate_gas({'from': WALLET_ADDRESS})
        nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)
        tx = contract.functions.createAlert(content_hash).build_transaction({
            'chainId': 11155111, 'gas': gas_estimate, 'gasPrice': w3.eth.gas_price,
            'from': WALLET_ADDRESS, 'nonce': nonce
        })
        signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
        sent_tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
        tx_hash = sent_tx_hash.hex()
        print(f"Transaction sent successfully! Hash: {tx_hash}")
        return tx_hash
    except Exception as e:
        print(f"Error logging to blockchain: {e}")
        return None

# --- API MODELS ---
class TextAnalyzeRequest(BaseModel):
    text: str

class TextAnalyzeResponse(BaseModel):
    text: str
    ai_generated_score: float
    toxicity_score: float
    negative_sentiment_score: float
    is_threat: bool
    threat_recorded: bool
    content_hash: str | None = None
    transaction_hash: str | None = None

# --- HISTORY ENDPOINT ---
@app.get("/history")
async def get_history():
    reports = []
    for report in threat_collection.find({}).sort("timestamp", -1):
        report["_id"] = str(report["_id"])
        reports.append(report)
    return reports

# --- TEXT ANALYSIS ENDPOINT ---
@app.post("/analyze", response_model=TextAnalyzeResponse)
async def analyze_text(request: TextAnalyzeRequest):
    detector = get_ai_gen_detector()
    tox_detector = get_toxicity_detector()
    sent_detector = get_sentiment_detector()

    gen_result = detector(request.text)[0]
    ai_score = gen_result['score'] if gen_result['label'] == 'LABEL_1' else 1 - gen_result['score']
    
    tox_result = tox_detector(request.text)[0]
    tox_score = tox_result['score'] if tox_result['label'] == 'toxic' else 1 - tox_result['score']
    
    sent_result = sent_detector(request.text)[0]
    neg_score = sent_result['score'] if sent_result['label'] == 'negative' else 0.0

    is_threat = (ai_score > 0.95) or (tox_score > 0.80) or (neg_score > 0.90)

    threat_recorded = False
    tx_hash = None
    content_hash = hashlib.sha256(request.text.encode()).hexdigest()
    
    if is_threat:
        tx_hash = log_threat_to_blockchain(content_hash)
        if tx_hash:
            threat_recorded = True
            
    db_document = {
        "timestamp": datetime.utcnow(), "inputType": "Text", "content": request.text,
        "content_hash": content_hash,
        "analysis": { "ai_generated_score": ai_score, "toxicity_score": tox_score, "negative_sentiment_score": neg_score, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    threat_collection.insert_one(db_document)

    return TextAnalyzeResponse(text=request.text, ai_generated_score=ai_score, toxicity_score=tox_score, negative_sentiment_score=neg_score, is_threat=is_threat, threat_recorded=threat_recorded, content_hash=content_hash, transaction_hash=tx_hash)

# --- IMAGE ANALYSIS ENDPOINT ---
@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    classifier = get_clip_classifier()
    
    contents = await file.read()
    file_path = os.path.join(UPLOADS_DIR, f"{datetime.utcnow().timestamp()}_{file.filename}")
    with open(file_path, "wb") as f:
        f.write(contents)
    
    image = Image.open(io.BytesIO(contents))
    real_labels = ["a realistic photograph", "a normal photo"]
    ai_labels = ["a digital painting", "CGI render", "surreal art"]
    results = classifier(image, candidate_labels=real_labels + ai_labels)
    ai_score = sum(res['score'] for res in results if res['label'] in ai_labels)
    top_prediction = results[0]['label']
    is_threat = ai_score > 0.60
    
    threat_recorded = False
    tx_hash = None
    content_hash = hashlib.sha256(contents).hexdigest()
    
    if is_threat:
        tx_hash = log_threat_to_blockchain(content_hash)
        if tx_hash:
            threat_recorded = True

    db_document = {
        "timestamp": datetime.utcnow(), "inputType": "Image", "content": file_path,
        "content_hash": content_hash,
        "analysis": { "ai_semantic_score": ai_score, "top_prediction": top_prediction, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    threat_collection.insert_one(db_document)

    return { "filename": file.filename, "ai_semantic_score": ai_score, "top_prediction": top_prediction, "is_threat": is_threat, "threat_recorded": threat_recorded, "content_hash": content_hash, "transaction_hash": tx_hash }

# --- VIDEO ANALYSIS ENDPOINT ---
@app.post("/analyze-video")
async def analyze_video(file: UploadFile = File(...)):
    classifier = get_clip_classifier()
    
    file_path = os.path.join(UPLOADS_DIR, f"{datetime.utcnow().timestamp()}_{file.filename}")
    contents = await file.read()
    with open(file_path, "wb") as f:
        f.write(contents)

    vidcap = cv2.VideoCapture(file_path)
    fps = vidcap.get(cv2.CAP_PROP_FPS)
    frames_analyzed, high_risk_frames = 0, 0
    frame_scores = []
    real_labels = ["a realistic photograph", "a normal photo"]
    ai_labels = ["a digital painting", "CGI render", "surreal art"]
    
    while vidcap.isOpened():
        frame_id = int(vidcap.get(cv2.CAP_PROP_POS_FRAMES))
        success, frame = vidcap.read()
        if not success: break
        if frame_id % int(fps or 30) == 0:
            frames_analyzed += 1
            frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            pil_image = Image.fromarray(frame_rgb)
            results = classifier(pil_image, candidate_labels=real_labels + ai_labels)
            ai_score = sum(res['score'] for res in results if res['label'] in ai_labels)
            frame_scores.append(ai_score)
            if ai_score > 0.60:
                high_risk_frames += 1
    vidcap.release()
    
    avg_ai_score = sum(frame_scores) / len(frame_scores) if frame_scores else 0
    is_threat = (high_risk_frames / frames_analyzed) > 0.50 if frames_analyzed > 0 else False
    
    threat_recorded = False
    tx_hash = None
    content_hash = hashlib.sha256(contents).hexdigest()
    
    if is_threat:
        tx_hash = log_threat_to_blockchain(content_hash)
        if tx_hash:
            threat_recorded = True

    db_document = {
        "timestamp": datetime.utcnow(), "inputType": "Video", "content": file_path,
        "content_hash": content_hash,
        "analysis": { "average_ai_score": avg_ai_score, "high_risk_frames_detected": high_risk_frames, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    threat_collection.insert_one(db_document)

    return { "filename": file.filename, "frames_analyzed": frames_analyzed, "high_risk_frames_detected": high_risk_frames, "average_ai_score": avg_ai_score, "is_threat": is_threat, "threat_recorded": threat_recorded, "content_hash": content_hash, "transaction_hash": tx_hash }