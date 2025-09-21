# backend/app/services/nutrition_service.py
from sqlalchemy.orm import Session
from app.models.nutrition import Nutrition
from typing import Dict, Optional


def get_nutrition_by_name(db: Session, name: str) -> Optional[Nutrition]:
    return db.query(Nutrition).filter(Nutrition.name.ilike(name)).first()


def calculate_nutrition_for_item(db: Session, name: str, grams: float) -> Dict:
    """
    Returns a nutrition dict for the provided grams, using per-100g values.
    If item is not found returns zeros.
    """
    rec = get_nutrition_by_name(db, name)
    if not rec:
        return {
            "name": name,
            "grams": grams,
            "calories": 0.0,
            "protein": 0.0,
            "fat": 0.0,
            "carbs": 0.0,
            "found": False,
        }
    factor = grams / 100.0
    return {
        "name": rec.name,
        "grams": grams,
        "calories": rec.calories_per_100g * factor,
        "protein": rec.protein_per_100g * factor,
        "fat": rec.fat_per_100g * factor,
        "carbs": rec.carbs_per_100g * factor,
        "found": True,
    }
