import fastapi
import uvicorn
from fastapi import Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from passlib.context import CryptContext
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime, timedelta
from sqlalchemy.future import select

from src.api.endpoints import router as api_endpoint_router
from src.config.events import execute_backend_server_event_handler, terminate_backend_server_event_handler
from src.config.manager import settings
from src.repository.database import get_db_session
from src.models.db.account import Account as User
from src.nlp import analyze_name  # Adjust import if needed

# JWT Config
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# FastAPI app setup
def initialize_backend_application() -> fastapi.FastAPI:
    app = fastapi.FastAPI(**settings.set_backend_app_attributes)  # type: ignore

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_ORIGINS,
        allow_credentials=settings.IS_ALLOWED_CREDENTIALS,
        allow_methods=settings.ALLOWED_METHODS,
        allow_headers=settings.ALLOWED_HEADERS,
    )

    app.add_event_handler("startup", execute_backend_server_event_handler(backend_app=app))
    app.add_event_handler("shutdown", terminate_backend_server_event_handler(backend_app=app))
    app.include_router(router=api_endpoint_router, prefix=settings.API_PREFIX)

    return app

backend_app: fastapi.FastAPI = initialize_backend_application()

# Auth models
class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class UserInfo(BaseModel):
    id: int
    name: str
    email: EmailStr

class AuthResponse(BaseModel):
    token: str
    user: UserInfo


# Utility
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# Auth routes
@backend_app.post("/register", response_model=AuthResponse)
async def register(data: RegisterRequest, db: AsyncSession = Depends(get_db_session)):
    result = await db.execute(
        User.__table__.select().where(User.email == data.email)
    )
    existing_user = result.scalar_one_or_none()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    if not analyze_name(data.name):
        raise HTTPException(status_code=400, detail="Invalid name (NLP check failed)")

    hashed_password = pwd_context.hash(data.password)
    new_user = User(name=data.name, email=data.email, _hashed_password=hashed_password)
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    access_token = create_access_token(data={"sub": new_user.email})
    return {
    "token": access_token,
    "user": {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email
    }
}


@backend_app.post("/login", response_model=AuthResponse)
async def login(data: LoginRequest, db: AsyncSession = Depends(get_db_session)):
    result = await db.execute(select(User).where(User.email == data.email))
    user = result.scalars().first()
    if not user or not pwd_context.verify(data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": user.email})
    return {
    "token": access_token,
    "user": {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }
}


# Uvicorn entry point
if __name__ == "__main__":
    uvicorn.run(
        app="src.main:backend_app", 
        host=settings.SERVER_HOST,
        port=settings.SERVER_PORT,
        reload=settings.DEBUG,
        workers=settings.SERVER_WORKERS,
        log_level=settings.LOGGING_LEVEL,
    )

