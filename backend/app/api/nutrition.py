# backend/app/api/routes/nutrition.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.services.nutrition_service import get_nutrition_by_name, calculate_nutrition_for_item
from app.schemas.nutrition import NutritionRead
from app.api.dependencies import get_db

router = APIRouter(prefix="/nutrition", tags=["nutrition"])


@router.get("/item/{name}", response_model=NutritionRead)
def get_item(name: str, db: Session = Depends(get_db)):
    rec = get_nutrition_by_name(db, name)
    if not rec:
        raise HTTPException(status_code=404, detail="Nutrition entry not found")
    return rec


@router.get("/estimate/{name}")
def estimate_item(name: str, grams: float = 100.0, db: Session = Depends(get_db)):
    return calculate_nutrition_for_item(db, name, grams)
