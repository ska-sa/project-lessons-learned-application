from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import time
import psycopg2
from psycopg2 import OperationalError
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:123@db:5432/project_lessons_db")


def wait_for_postgres(url, timeout=30):
    start = time.time()
    while True:
        try:
            conn = psycopg2.connect(url)
            conn.close()
            #print("Database is ready.")
            break
        except OperationalError as e:
            if time.time() - start > timeout:
                #print("Database connection timed out.")
                raise e
            #print("Waiting for the database to be ready...")
            time.sleep(2)

wait_for_postgres(DATABASE_URL)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
