# backend/app/core/config.py
from pydantic import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "Diet Tracker Backend"
    DEBUG: bool = True
    DATABASE_URL: str = "sqlite:///./dev.db"  # replace with your DB URL in prod
    SECRET_KEY: str = "replace-with-a-secure-random-string"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    MEDIA_DIR: str = "./media"
    MODEL_DIR: str = "../ai-models/inference/models"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()
