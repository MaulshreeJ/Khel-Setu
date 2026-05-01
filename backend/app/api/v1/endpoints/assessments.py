from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import Any
import tempfile
import os
import uuid

from db.session import get_db
from api.deps import get_current_user
from db import models
from core.cv_analyzer import analyze_squat_video, analyze_pushup_video, analyze_plank_video, analyze_vertical_jump_video

router = APIRouter()


# ── Shared helper ─────────────────────────────────────────────────────────────

async def _process_video(file: UploadFile, analyzer_fn, test_name: str, test_description: str, unit: str, current_user, db: Session):
    """Save uploaded video to a temp file, run analyzer, persist result, return response."""
    if not file.content_type.startswith("video/"):
        raise HTTPException(status_code=400, detail="File provided is not a video.")

    try:
        suffix = os.path.splitext(file.filename)[1] or ".mp4"
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        try:
            analysis_result = analyzer_fn(tmp_path)
        except Exception as e:
            os.unlink(tmp_path)
            raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

        os.unlink(tmp_path)

        # Upsert AssessmentTest definition
        test_def = db.query(models.AssessmentTest).filter(models.AssessmentTest.name == test_name).first()
        if not test_def:
            test_def = models.AssessmentTest(name=test_name, description=test_description, unit=unit)
            db.add(test_def)
            db.flush()

        # Create session
        assessment = models.AthleteAssessment(
            athlete_id=current_user.id,
            status=models.AssessmentStatusEnum.COMPLETED
        )
        db.add(assessment)
        db.flush()

        # Save result
        result = models.AssessmentResult(
            assessment_id=assessment.id,
            test_id=test_def.id,
            recorded_value=float(analysis_result["reps_counted"]),
            ai_analysis_data=analysis_result
        )
        db.add(result)
        db.commit()
        db.refresh(result)

        return {"message": "Video processed successfully", "analysis": analysis_result, "result_id": result.id}

    except HTTPException:
        raise
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/upload-video")
async def upload_video_assessment(
    file: UploadFile = File(...),
    current_user: models.Athlete = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Upload a squat video for AI analysis."""
    return await _process_video(
        file, analyze_squat_video,
        "Squat (CV)", "Live video AI squat analysis", "reps",
        current_user, db
    )


@router.post("/upload-video-pushup")
async def upload_pushup_assessment(
    file: UploadFile = File(...),
    current_user: models.Athlete = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Upload a push-up video for AI analysis."""
    return await _process_video(
        file, analyze_pushup_video,
        "Push-Up (CV)", "Live video AI push-up analysis", "reps",
        current_user, db
    )


@router.post("/upload-video-plank")
async def upload_plank_assessment(
    file: UploadFile = File(...),
    current_user: models.Athlete = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Upload a plank video for AI analysis."""
    return await _process_video(
        file, analyze_plank_video,
        "Plank (CV)", "Live video AI plank hold analysis", "seconds",
        current_user, db
    )


@router.post("/upload-video-vertical-jump")
async def upload_vertical_jump_assessment(
    file: UploadFile = File(...),
    current_user: models.Athlete = Depends(get_current_user),
    db: Session = Depends(get_db)
) -> Any:
    """Upload a vertical jump video for AI analysis."""
    return await _process_video(
        file, analyze_vertical_jump_video,
        "Vertical Jump (CV)", "Live video AI vertical jump analysis", "cm",
        current_user, db
    )

@router.get("/my-results")
def get_my_results(
    current_user: models.Athlete = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all assessment results for the currently logged-in athlete.
    """
    results = db.query(models.AssessmentResult)\
        .join(models.AthleteAssessment)\
        .filter(models.AthleteAssessment.athlete_id == current_user.id)\
        .order_by(models.AthleteAssessment.created_at.desc() if hasattr(models.AthleteAssessment, 'created_at') else models.AthleteAssessment.started_at.desc())\
        .all()
        
    response = []
    for r in results:
        response.append({
            "id": r.id,
            "test_name": r.test.name,
            "score": r.recorded_value,
            "unit": r.test.unit,
            "date": r.assessment.started_at.strftime("%Y-%m-%d"),
            "ai_feedback": r.ai_analysis_data.get("feedback", "") if r.ai_analysis_data else None
        })
        
    return response
