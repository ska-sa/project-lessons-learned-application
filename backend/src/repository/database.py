import pydantic
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.pool import QueuePool
from typing import AsyncGenerator


from src.config.manager import settings


class AsyncDatabase:
    def __init__(self):
        self.postgres_uri = (
            f"{settings.DB_POSTGRES_SCHEMA}://"
            f"{settings.DB_POSTGRES_USERNAME}:"
            f"{settings.DB_POSTGRES_PASSWORD}@"
            f"{settings.DB_POSTGRES_HOST}:"
            f"{settings.DB_POSTGRES_PORT}/"
            f"{settings.DB_POSTGRES_NAME}"
)


        self.async_engine: AsyncEngine = create_async_engine(
            url=self.set_async_db_uri,
            echo=settings.IS_DB_ECHO_LOG,
            pool_size=settings.DB_POOL_SIZE,
            max_overflow=settings.DB_POOL_OVERFLOW,
            poolclass=QueuePool,
        )

        self.async_sessionmaker: async_sessionmaker[AsyncSession] = async_sessionmaker(
            bind=self.async_engine,
            expire_on_commit=False,
        )

    @property
    def set_async_db_uri(self) -> str:
        """
        Convert the synchronous database driver URI to the asynchronous equivalent using asyncpg.
        """
        return self.postgres_uri.replace("postgresql://", "postgresql+asyncpg://")


# Instantiate the database
async_db = AsyncDatabase()


# Dependency function for FastAPI route injection
async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_db.async_sessionmaker() as session:
        yield session
