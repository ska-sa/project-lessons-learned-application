from fastapi import FastAPI
from app.database import Base, engine
from app.lessonLearned.lessonLearnedController import router as lessonRouter
from app.documents.documentController import router as documents
from app.user.userController import router as user
from app.auditLog.auditlogController import router as auditlog
from app.message.messageController import router as message
from app.subCategories.subCategoryController import router as subcategory
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(lessonRouter)
app.include_router(documents)
app.include_router(user)
app.include_router(auditlog)
app.include_router(message)
app.include_router(subcategory)
# Optional: Root endpoint
#@app.get("/")
#def read_root():
#    return {"message": "Welcome to the Project Lessons Learned API"}
