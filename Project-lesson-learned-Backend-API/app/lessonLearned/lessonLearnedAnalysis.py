from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.lessonLearned.lessonLearnedModel import LessonLearned
import nltk
from nltk.corpus import stopwords
from collections import Counter, defaultdict
import string
import re
from datetime import datetime

from app.database import SessionLocal  

router = APIRouter()

# Define get_db inside this file
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/lessons/analysis")
def analyze_lessons(db: Session = Depends(get_db)):
    # Your existing logic here ...
    lessons = db.query(LessonLearned.description, LessonLearned.created_at).all()

    all_text = " ".join(lesson.description for lesson, _ in lessons if lesson)
    
    all_text = all_text.lower()
    all_text = re.sub(f"[{string.punctuation}]", " ", all_text)
    words = nltk.word_tokenize(all_text)
    
    stop_words = set(stopwords.words('english'))
    filtered_words = [w for w in words if w.isalpha() and w not in stop_words]

    freq_dist = Counter(filtered_words)
    top_words = freq_dist.most_common(10)

    overall_data = {
        "labels": [w for w, _ in top_words],
        "counts": [count for _, count in top_words]
    }

    time_series = defaultdict(lambda: Counter())

    for description, created_at in lessons:
        if not description or not created_at:
            continue
        desc_text = description.lower()
        desc_text = re.sub(f"[{string.punctuation}]", " ", desc_text)
        desc_words = set(nltk.word_tokenize(desc_text))
        month_key = created_at.strftime("%Y-%m")
        for word, _ in top_words:
            if word in desc_words:
                time_series[month_key][word] += 1

    months = sorted(time_series.keys())
    line_data = {
        "labels": months,
        "datasets": []
    }
    for word, _ in top_words:
        counts = [time_series[month].get(word, 0) for month in months]
        line_data["datasets"].append({
            "label": word,
            "data": counts
        })

    return {
        "overall": overall_data,
        "time_series": line_data
    }
