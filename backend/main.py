# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from config import UPLOADS_DIR
from routers import analysis, history # Import the routers

# Create uploads directory if it doesn't exist
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = FastAPI(title="Cyber Guardian API - Modular")

# --- CORS MIDDLEWARE ---
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Mount Static Files ---
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

# --- Include Routers ---
# This tells FastAPI to use the endpoints defined in your router files
app.include_router(analysis.router)
app.include_router(history.router)

# --- Root Endpoint (Optional - for testing) ---
@app.get("/")
async def read_root():
    return {"message": "Cyber Guardian API is running"}

# No need for AI model loading or blockchain setup here,
# it's handled in the imported modules.
print("FastAPI application started.")

# You run this file with: uvicorn main:app --reload