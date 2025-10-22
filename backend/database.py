# backend/database.py
from pymongo import MongoClient
from datetime import datetime
from config import MONGO_URI
from bson import ObjectId

try:
    client = MongoClient(MONGO_URI)
    db = client.cyber_guardian
    threat_collection = db.threat_reports
    print("Connected to MongoDB.")
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")
    threat_collection = None

def save_analysis(document: dict):
    """Saves an analysis document to the threat_reports collection."""
    if threat_collection is not None:
        document["timestamp"] = datetime.utcnow()
        try:
            result = threat_collection.insert_one(document)
            print(f"Analysis saved to DB with ID: {result.inserted_id}")
            return str(result.inserted_id)
        except Exception as e:
            print(f"Error saving to MongoDB: {e}")
            return None
    return None

def get_analysis_history():
    """Fetches all analysis reports from the database, newest first."""
    reports = []
    if threat_collection is not None:
        try:
            for report in threat_collection.find({}).sort("timestamp", -1):
                report["_id"] = str(report["_id"])
                reports.append(report)
        except Exception as e:
            print(f"Error fetching history from MongoDB: {e}")
    return reports