from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from db.session import SessionLocal, get_db, engine
from api.v1.endpoints import auth, assessments
from db import models
from db.models import Base

# Create all tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="KhelSetu API",
    description="AI-Powered Sports Assessment Platform API",
    version="1.0.0",
)

# CORS middleware — allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(assessments.router, prefix="/api/v1/assessments", tags=["assessments"])

@app.get("/")
def read_root():
    return {"message": "KhelSetu API is running!", "status": "healthy"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "KhelSetu Backend"}

@app.get("/db")
def get_db_test(db: Session = Depends(get_db)):
    try:
        # Example simple query: count athletes
        count = db.query(models.Athlete).count()
        return {"status": "success", "athlete_count": count}
    except Exception as e:
        # Something went wrong connecting to DB or querying
        raise HTTPException(status_code=500, detail=str(e))
