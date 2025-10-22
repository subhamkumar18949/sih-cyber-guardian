# backend/routers/history.py
from fastapi import APIRouter
from database import get_analysis_history
from schemas import HistoryResponse # Assuming HistoryResponse is defined in schemas.py
from typing import List

router = APIRouter()

@router.get("/history", response_model=List[HistoryResponse])
async def read_history():
    return get_analysis_history()