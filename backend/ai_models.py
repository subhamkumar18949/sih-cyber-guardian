# backend/ai_models.py
from transformers import pipeline

# Lazy loading variables
_ai_gen_detector = None
_toxicity_detector = None
_sentiment_detector = None
_clip_classifier = None

def get_ai_gen_detector():
    global _ai_gen_detector
    if _ai_gen_detector is None:
        print("Loading custom AI-gen detector...")
        _ai_gen_detector = pipeline("text-classification", model="./my_custom_ai_detector")
        print("AI-gen detector loaded.")
    return _ai_gen_detector

def get_toxicity_detector():
    global _toxicity_detector
    if _toxicity_detector is None:
        print("Loading toxicity detector...")
        _toxicity_detector = pipeline("text-classification", model="martin-ha/toxic-comment-model")
        print("Toxicity detector loaded.")
    return _toxicity_detector
    
def get_sentiment_detector():
    global _sentiment_detector
    if _sentiment_detector is None:
        print("Loading sentiment detector...")
        _sentiment_detector = pipeline("sentiment-analysis", model="cardiffnlp/twitter-roberta-base-sentiment-latest")
        print("Sentiment detector loaded.")
    return _sentiment_detector

def get_clip_classifier():
    global _clip_classifier
    if _clip_classifier is None:
        print("Loading CLIP classifier...")
        _clip_classifier = pipeline("zero-shot-image-classification", model="openai/clip-vit-large-patch14")
        print("CLIP classifier loaded.")
    return _clip_classifier