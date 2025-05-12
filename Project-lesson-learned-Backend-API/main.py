from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.lesson_learned.lesson_learnedController.lessonLearnedController import lesson_learned_controller

app = FastAPI(
    title="Project Lessons Learned API",
    version="1.0.0",
)

# Allow CORS (adjust origins as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set specific domains in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the router
app.include_router(lesson_learned_controller.router, prefix="/lessons", tags=["Lessons Learned"])

# Optional: Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the Project Lessons Learned API"}
