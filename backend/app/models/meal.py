# backend/app/models/meal.py
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Float, JSON, func
from sqlalchemy.orm import relationship
from app.core.database import Base


class Meal(Base):
    __tablename__ = "meals"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    items = Column(JSON, nullable=False)  # list of { name, grams, nutrition: {cal, protein, ...} }
    total_calories = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", back_populates="meals")
