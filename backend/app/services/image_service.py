# backend/app/services/image_service.py
import os
import uuid
from pathlib import Path
from fastapi import UploadFile
from app.core.config import settings
import shutil


def save_upload_file(upload_file: UploadFile, destination_folder: str = None) -> str:
    destination_folder = destination_folder or settings.MEDIA_DIR
    Path(destination_folder).mkdir(parents=True, exist_ok=True)
    ext = os.path.splitext(upload_file.filename)[1] or ".jpg"
    name = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(destination_folder, name)
    with open(path, "wb") as buffer:
        shutil.copyfileobj(upload_file.file, buffer)
    return path
