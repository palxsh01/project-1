# backend/app/services/meal_service.py
from sqlalchemy.orm import Session
from app.models.meal import Meal
from app.schemas.meal import MealCreate
from app.services.nutrition_service import calculate_nutrition_for_item
from typing import Dict, Any
from datetime import datetime, date


def create_meal_from_items(db: Session, user_id: int, items: list[Dict]) -> Meal:
    """
    items: list of {"name": str, "grams": float}
    """
    enriched = []
    total_calories = 0.0
    for item in items:
        n = calculate_nutrition_for_item(db, item["name"], item["grams"])
        enriched.append({"name": item["name"], "grams": item["grams"], "nutrition": n})
        total_calories += n.get("calories", 0.0)

    meal = Meal(user_id=user_id, items=enriched, total_calories=total_calories, timestamp=datetime.utcnow())
    db.add(meal)
    db.commit()
    db.refresh(meal)
    return meal


def get_meals_by_user_and_date(db: Session, user_id: int, on_date: date):
    start = datetime.combine(on_date, datetime.min.time())
    end = datetime.combine(on_date, datetime.max.time())
    return db.query(Meal).filter(Meal.user_id == user_id, Meal.timestamp >= start, Meal.timestamp <= end).all()
