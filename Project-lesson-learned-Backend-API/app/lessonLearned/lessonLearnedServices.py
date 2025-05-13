from uuid import UUID
from typing import List
from app.lessonLearned.lessonLearnedModel import LessonLearned
from app.lessonLearned.lessonLearnedSchemas import LessonLearnedUpdate, LessonLearnedCreate
from sqlalchemy.orm import Session

def createLesson(db: Session, lesson: LessonLearnedCreate) -> LessonLearned :
    db_lesson = LessonLearned(**lesson.dict())
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

def getLessonById(db: Session, lesson_id: UUID):
    return db.query(LessonLearned).filter(LessonLearned.lesson_id == lesson_id).first()

def updateLesson(db: Session, lesson_id: UUID, update_data: LessonLearnedUpdate):
    lesson = getLessonById(db, lesson_id)
    if lesson:
        for field, value in update_data.dict(exclude_unset=True).items():
            setattr(lesson, field, value)
        db.commit()
        db.refresh(lesson)
    return lesson

def getAllLesson(db: Session) -> List[LessonLearned]:       
    return db.query(LessonLearned).all()