# backend/app/api/routes/meals.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from typing import List

from app.api.dependencies import get_db, get_current_user
from app.schemas.meal import MealCreate, MealRead
from app.services.meal_service import create_meal_from_items, get_meals_by_user_and_date

router = APIRouter(prefix="/meals", tags=["meals"])


@router.post("/", response_model=MealRead)
def create_meal(meal_in: MealCreate, db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    items = [{"name": it.name, "grams": it.grams} for it in meal_in.items]
    meal = create_meal_from_items(db, user_id=current_user.id, items=items)
    return meal


@router.get("/day", response_model=List[MealRead])
def get_day_meals(day: date = date.today(), db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    meals = get_meals_by_user_and_date(db, user_id=current_user.id, on_date=day)
    return meals
