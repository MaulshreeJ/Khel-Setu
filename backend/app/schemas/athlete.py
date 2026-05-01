from pydantic import BaseModel,EmailStr,ConfigDict
from datetime import datetime
from typing import Optional
from db.models import GenderEnum
import uuid

class AthleteBase(BaseModel):
    phone_number : str
    full_name:Optional[str]=None


class AthleteCreate(AthleteBase):
    gender: GenderEnum
    date_of_birth: datetime
    password: str

class AthleteUpdate(BaseModel):
    name : Optional[str]=None
    state : Optional[str]=None
    district :Optional[str]=None

# Schema for athlete in response (GET request)
# This prevents sensitive data like password from being returned
class AthleteInDBBase(AthleteBase):
    model_config = ConfigDict(from_attributes=True)  # Allows ORM mode
    id: str
    state: Optional[str] = None
    district: Optional[str] = None
    profile_status: str
    created_at: datetime


class Athlete(AthleteInDBBase):
    pass

class AthleteInDB(AthleteInDBBase):
    hashed_password: str

