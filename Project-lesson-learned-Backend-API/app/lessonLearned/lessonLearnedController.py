from typing import List
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.lessonLearned.lessonLearnedSchemas import (
    LessonLearnedUpdate,
    LessonLearnedCreate,
    LessonLearnedResponse,
)
from app.lessonLearned.lessonLearnedServices import (
    createLesson,
    getLessonById,
    updateLesson,
    getAllLesson,
)

from app.database import SessionLocal

router = APIRouter(prefix="/lessons", tags=["Lessons Learned"])

def getDb():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=LessonLearnedResponse)
async def createLessonEndpoint(lesson: LessonLearnedCreate, db: Session = Depends(getDb)): 
    return createLesson(db, lesson)

@router.get("/{lessonId}", response_model=LessonLearnedResponse)
async def getLesson(lessonId: UUID, db: Session = Depends(getDb)):
    lesson = getLessonById(db, lessonId)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@router.put("/{lessonId}", response_model=LessonLearnedResponse)  # ✅ fixed this line
async def updateLessonEndpoint(lessonId: UUID, lesson: LessonLearnedUpdate, db: Session = Depends(getDb)):
    update = updateLesson(db, lessonId, lesson)
    if not update:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return update

@router.get("/", response_model=List[LessonLearnedResponse])  # ✅ fixed this line
async def listLessons(db: Session = Depends(getDb)):
    return getAllLesson(db)
