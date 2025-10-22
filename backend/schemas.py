# backend/schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime # <-- Add this line

class TextAnalyzeRequest(BaseModel):
    text: str

class TextAnalyzeResponse(BaseModel):
    text: str
    ai_generated_score: float
    toxicity_score: float
    negative_sentiment_score: float # Added negative sentiment score
    is_threat: bool
    threat_recorded: bool
    content_hash: Optional[str] = None
    transaction_hash: Optional[str] = None

class ImageAnalyzeResponse(BaseModel):
    filename: str
    ai_semantic_score: float
    top_prediction: str
    is_threat: bool
    threat_recorded: bool
    content_hash: Optional[str] = None
    transaction_hash: Optional[str] = None

class VideoAnalyzeResponse(BaseModel):
    filename: str
    frames_analyzed: int
    high_risk_frames_detected: int
    average_ai_score: float
    is_threat: bool
    threat_recorded: bool
    content_hash: Optional[str] = None
    transaction_hash: Optional[str] = None

class HistoryResponse(BaseModel):
    _id: str
    timestamp: datetime # This line will now work
    inputType: str
    content: str
    content_hash: Optional[str] = None
    analysis: dict
    blockchain_hash: Optional[str] = None