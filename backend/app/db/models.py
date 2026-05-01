from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Enum, Text, Boolean
from sqlalchemy.orm import relationship, declarative_base

import enum
from datetime import datetime
import uuid


Base = declarative_base()

class GenderEnum(enum.Enum):
    MALE="male"
    FEMALE="female"
    OTHERS="others"

class AssessmentStatusEnum(enum.Enum):
    REGISTERED = "registered"
    ASSESSMENT_PENDING = "assessment_pending"
    COMPLETED = "completed"
    UNDER_REVIEW = "under_review"

class TestTypeEnum(enum.Enum):
    HEIGHT="height"
    WEIGHT="weight"
    VERTICAL_JUMP = "vertical_jump"
    SHUTTLE_RUN = "shuttle_run"
    SIT_UPS = "sit_ups"
    ENDURANCE_RUN = "endurance_run"

class OfficialRoleEnum(enum.Enum):
    ADMIN = "admin"
    SCOUT = "scout"
    REVIEWER = "reviewer"


class Athlete(Base):
    __tablename__ = "athletes"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    phone_number = Column(String(10), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    date_of_birth = Column(DateTime)
    gender = Column(Enum(GenderEnum))
    state = Column(String(50))
    district = Column(String(50))
    pincode = Column(String(10))
    profile_status = Column(Enum(AssessmentStatusEnum), default=AssessmentStatusEnum.REGISTERED)
    created_at = Column(DateTime, default=datetime.now)
    assessments = relationship("AthleteAssessment", back_populates="athlete", cascade="all, delete-orphan")

class AssessmentTest(Base):
    __tablename__ = "assessment_tests"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), unique=True, nullable=False)
    description = Column(Text)
    unit = Column(String(20))
    benchmark_data = Column(JSON)
    results = relationship("AssessmentResult", back_populates="test")

class AthleteAssessment(Base):
    __tablename__ = "athlete_assessments"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    athlete_id = Column(String(36), ForeignKey("athletes.id"), nullable=False)
    status = Column(Enum(AssessmentStatusEnum), default=AssessmentStatusEnum.ASSESSMENT_PENDING)
    started_at = Column(DateTime, default=datetime.now)
    completed_at = Column(DateTime)
    athlete = relationship("Athlete", back_populates="assessments")
    results = relationship("AssessmentResult", back_populates="assessment", cascade="all, delete-orphan")

class AssessmentResult(Base):
    __tablename__ = "assessment_results"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    assessment_id = Column(String(36), ForeignKey("athlete_assessments.id"), nullable=False)
    test_id = Column(Integer, ForeignKey("assessment_tests.id"), nullable=False)
    recorded_value = Column(Float, nullable=False)
    percentile = Column(Float)
    video_url = Column(String(500))
    ai_analysis_data = Column(JSON)
    is_flagged = Column(Boolean, default=False)
    flag_reason = Column(Text)
    verified_by_ai_at = Column(DateTime, default=datetime.now)
    assessment = relationship("AthleteAssessment", back_populates="results")
    test = relationship("AssessmentTest", back_populates="results")

# Optional Admin Model
class Official(Base):
    __tablename__ = "officials"
    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    role = Column(String(50))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.now)
