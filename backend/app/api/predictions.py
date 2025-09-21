# backend/app/api/routes/predictions.py
from fastapi import APIRouter, File, UploadFile, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.api.dependencies import get_db, get_current_user
from app.services.image_service import save_upload_file
from app.services.ai_service import ai_model
from app.services.meal_service import create_meal_from_items

router = APIRouter(prefix="/predict", tags=["predictions"])


@router.post("/image")
def predict_image(file: UploadFile = File(...), db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    saved = save_upload_file(file)
    detections = ai_model.predict_from_path(saved)

    # detections expected: list of {"name","confidence","bbox","estimated_grams"}
    if not isinstance(detections, list):
        raise HTTPException(status_code=500, detail="AI prediction failed or returned invalid result")

    # Optionally create a meal from detections (client can choose)
    items = [{"name": d.get("name"), "grams": d.get("estimated_grams", 0)} for d in detections]
    meal = create_meal_from_items(db, user_id=current_user.id, items=items)

    return {"detections": detections, "meal": {"id": meal.id, "total_calories": meal.total_calories}}
