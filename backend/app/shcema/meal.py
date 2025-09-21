# backend/app/schemas/meal.py
from pydantic import BaseModel
from typing import List, Dict, Optional
from datetime import datetime


class MealItem(BaseModel):
    name: str
    grams: float
    nutrition: Optional[Dict] = None


class MealCreate(BaseModel):
    items: List[MealItem]


class MealRead(BaseModel):
    id: int
    user_id: int
    items: List[MealItem]
    total_calories: float
    timestamp: datetime

    class Config:
        orm_mode = True
