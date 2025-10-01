from fastapi import FastAPI
from pydantic import BaseModel
from web3 import Web3
import json
import os
from dotenv import load_dotenv
from transformers import pipeline
import hashlib

# --- SETUP ---
load_dotenv()
app = FastAPI(title="Cyber Guardian API - Threat Scoring Engine")

# --- AI MODEL SETUP ---
print("Loading AI models...")
# Model 1: AI-Generation Detector
ai_gen_detector = pipeline("text-classification", model="Hello-SimpleAI/chatgpt-detector-roberta")

# Model 2: Toxicity Detector
toxicity_detector = pipeline("text-classification", model="martin-ha/toxic-comment-model")

# Model 3: Sentiment Detector
sentiment_detector = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
print("AI Models loaded successfully.")

# --- BLOCKCHAIN SETUP (remains the same) ---
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

# --- API MODELS ---
class AnalyzeRequest(BaseModel):
    text: str

class AnalyzeResponse(BaseModel):
    text: str
    ai_generated_score: float
    toxicity_score: float
    negative_sentiment_score: float
    final_risk_score: float
    is_threat: bool
    threat_recorded: bool
    transaction_hash: str | None = None

# --- API ENDPOINT ---
@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_text(request: AnalyzeRequest):
    # 1. Get AI-Generation Score
    gen_result = ai_gen_detector(request.text)[0]
    ai_score = gen_result['score'] if gen_result['label'] in ['ChatGPT', 'LABEL_1', 'Fake'] else 1 - gen_result['score']

    # 2. Get Toxicity Score
    tox_result = toxicity_detector(request.text)[0]
    tox_score = tox_result['score'] if tox_result['label'] == 'toxic' else 1 - tox_result['score']

    # 3. Get Negative Sentiment Score
    sent_result = sentiment_detector(request.text)[0]
    neg_score = sent_result['score'] if sent_result['label'] == 'negative' else 0.0

    # 4. Calculate Final Risk Score (weighted average)
    final_risk_score = (ai_score * 0.2) + (tox_score * 0.5) + (neg_score * 0.3)
    is_threat = final_risk_score > 0.70 # Set a high-risk threshold

    threat_recorded = False
    tx_hash = None

    # 5. If it's a high-risk threat, log it to the blockchain
    if is_threat and contract is not None:
        content_hash = hashlib.sha256(request.text.encode()).hexdigest()
        try:
            print(f"High-risk threat detected! Logging hash to blockchain...")
            nonce = w3.eth.get_transaction_count(WALLET_ADDRESS)
            tx = contract.functions.createAlert(content_hash).build_transaction({
                'chainId': 11155111, 'gas': 150000, 'gasPrice': w3.eth.gas_price,
                'from': WALLET_ADDRESS, 'nonce': nonce
            })
            signed_tx = w3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
            sent_tx_hash = w3.eth.send_raw_transaction(signed_tx.raw_transaction)
            tx_hash = sent_tx_hash.hex()
            threat_recorded = True
            print(f"Transaction sent successfully! Hash: {tx_hash}")
        except Exception as e:
            print(f"Error logging to blockchain: {e}")

    return AnalyzeResponse(
        text=request.text,
        ai_generated_score=ai_score,
        toxicity_score=tox_score,
        negative_sentiment_score=neg_score,
        final_risk_score=final_risk_score,
        is_threat=is_threat,
        threat_recorded=threat_recorded,
        transaction_hash=tx_hash
    )