import uuid
from sqlalchemy.orm import Session
from db import models
from schemas import athlete
from core.security import get_password_hash,verify_password



def get_athlete_by_phone(db: Session, phone_number: str):
    return db.query(models.Athlete).filter(models.Athlete.phone_number == phone_number).first()

def get_athlete(db: Session, athlete_id: uuid.UUID):
    return db.query(models.Athlete).filter(models.Athlete.id == athlete_id).first()

def create_athlete(db: Session, athlete_data: athlete.AthleteCreate):
    hashed_password = get_password_hash(athlete_data.password)
    db_athlete = models.Athlete(
        phone_number=athlete_data.phone_number,
        hashed_password=hashed_password,
        full_name=athlete_data.full_name,
        date_of_birth=athlete_data.date_of_birth,
        gender=athlete_data.gender
    )
    db.add(db_athlete)
    db.commit()
    db.refresh(db_athlete)
    return db_athlete

def update_athlete(db: Session, db_athlete: models.Athlete, athlete_update: athlete.AthleteUpdate):
    update_data = athlete_update.model_dump(exclude_unset=True)  # Only include provided fields
    for field, value in update_data.items():
        setattr(db_athlete, field, value)
    db.commit()
    db.refresh(db_athlete)
    return db_athlete


