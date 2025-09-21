# backend/app/services/ai_service.py
from typing import List, Dict
from app.core.config import settings
from pathlib import Path

# NOTE: Replace with your model loading + inference logic (Torch, ONNX, TF, etc.)
# Here we provide a stub that should be implemented to call the real detectors.

class AIModelWrapper:
    def __init__(self, model_dir: str = None):
        self.model_dir = model_dir or settings.MODEL_DIR
        # Example: load weights
        # self.food_detector = torch.load(Path(self.model_dir)/"food_detector.pth")
        # self.portion_model = ...
        # For now it is a placeholder.

    def predict_from_path(self, image_path: str) -> List[Dict]:
        """
        Returns a list of detections:
        [
          {"name": "banana", "confidence": 0.92, "bbox": [x,y,w,h], "estimated_grams": 120.0},
          ...
        ]
        """
        # TODO: Replace with actual model inference
        # For now return an empty list
        return []

# single instance for app
ai_model = AIModelWrapper()
