# app/api/v1/endpoints/auth.py
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from db.session import get_db
from schemas import token, athlete
from crud import crud_athlete
from core.security import verify_password, create_access_token
from api.deps import get_current_user
from db import models

router = APIRouter()

@router.post("/login", response_model=token.Token)
def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # 1. Authenticate user
    athlete_user = crud_athlete.get_athlete_by_phone(db, phone_number=form_data.username)
    if not athlete_user or not verify_password(form_data.password, athlete_user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect phone number or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # 2. Create access token
    access_token = create_access_token(
        data={"sub": str(athlete_user.id)}
    )
    
    # 3. Return token
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup", response_model=athlete.Athlete)
def create_new_athlete(athlete_data: athlete.AthleteCreate, db: Session = Depends(get_db)):
    # Check if phone number already exists
    db_athlete = crud_athlete.get_athlete_by_phone(db, phone_number=athlete_data.phone_number)
    if db_athlete:
        raise HTTPException(status_code=400, detail="Phone number already registered")
    
    # Create new athlete
    return crud_athlete.create_athlete(db=db, athlete_data=athlete_data)

@router.get("/me", response_model=athlete.Athlete)
def read_users_me(current_user: models.Athlete = Depends(get_current_user)):
    """
    Get current user profile information
    """
    return current_user