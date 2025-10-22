# backend/routers/analysis.py
from fastapi import APIRouter, File, UploadFile
from ai_models import (
    get_ai_gen_detector, get_toxicity_detector, get_sentiment_detector, get_clip_classifier
)
from schemas import TextAnalyzeRequest, TextAnalyzeResponse, ImageAnalyzeResponse, VideoAnalyzeResponse
from database import save_analysis
from blockchain_utils import log_threat_to_blockchain
from PIL import Image
import io
import cv2
import numpy as np
import hashlib
import os
import shutil
from datetime import datetime
from config import UPLOADS_DIR

router = APIRouter()

@router.post("/analyze", response_model=TextAnalyzeResponse)
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
        if tx_hash: threat_recorded = True
            
    db_document = {
        "inputType": "Text", "content": request.text, "content_hash": content_hash,
        "analysis": { "ai_generated_score": ai_score, "toxicity_score": tox_score, "negative_sentiment_score": neg_score, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    save_analysis(db_document)

    return TextAnalyzeResponse(text=request.text, ai_generated_score=ai_score, toxicity_score=tox_score, negative_sentiment_score=neg_score, is_threat=is_threat, threat_recorded=threat_recorded, content_hash=content_hash, transaction_hash=tx_hash)

@router.post("/analyze-image", response_model=ImageAnalyzeResponse)
async def analyze_image(file: UploadFile = File(...)):
    classifier = get_clip_classifier()
    contents = await file.read()
    file_path = os.path.join(UPLOADS_DIR, f"{datetime.utcnow().timestamp()}_{file.filename}")
    with open(file_path, "wb") as f: f.write(contents)
    
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
        if tx_hash: threat_recorded = True

    db_document = {
        "inputType": "Image", "content": file_path, "content_hash": content_hash,
        "analysis": { "ai_semantic_score": ai_score, "top_prediction": top_prediction, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    save_analysis(db_document)

    return ImageAnalyzeResponse(filename=file.filename, ai_semantic_score=ai_score, top_prediction=top_prediction, is_threat=is_threat, threat_recorded=threat_recorded, content_hash=content_hash, transaction_hash=tx_hash)

@router.post("/analyze-video", response_model=VideoAnalyzeResponse)
async def analyze_video(file: UploadFile = File(...)):
    classifier = get_clip_classifier()
    file_path = os.path.join(UPLOADS_DIR, f"{datetime.utcnow().timestamp()}_{file.filename}")
    contents = await file.read()
    with open(file_path, "wb") as f: f.write(contents)

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
            if ai_score > 0.60: high_risk_frames += 1
    vidcap.release()
    
    avg_ai_score = sum(frame_scores) / len(frame_scores) if frame_scores else 0
    is_threat = (high_risk_frames / frames_analyzed) > 0.50 if frames_analyzed > 0 else False
    
    threat_recorded = False
    tx_hash = None
    content_hash = hashlib.sha256(contents).hexdigest()
    
    if is_threat:
        tx_hash = log_threat_to_blockchain(content_hash)
        if tx_hash: threat_recorded = True

    db_document = {
        "inputType": "Video", "content": file_path, "content_hash": content_hash,
        "analysis": { "average_ai_score": avg_ai_score, "high_risk_frames_detected": high_risk_frames, "is_threat": is_threat },
        "blockchain_hash": tx_hash
    }
    save_analysis(db_document)

    return VideoAnalyzeResponse(filename=file.filename, frames_analyzed=frames_analyzed, high_risk_frames_detected=high_risk_frames, average_ai_score=avg_ai_score, is_threat=is_threat, threat_recorded=threat_recorded, content_hash=content_hash, transaction_hash=tx_hash)