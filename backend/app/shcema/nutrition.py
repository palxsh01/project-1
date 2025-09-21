# backend/app/schemas/nutrition.py
from pydantic import BaseModel
from typing import Optional, Dict


class NutritionRead(BaseModel):
    name: str
    calories_per_100g: float
    protein_per_100g: float
    fat_per_100g: float
    carbs_per_100g: float
    extras: Optional[Dict] = None

    class Config:
        orm_mode = True
