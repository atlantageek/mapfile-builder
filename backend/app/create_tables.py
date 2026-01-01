# app/create_tables.py

from app.db import engine
from app.models import Base

def create_all_tables():
    print("Creating tables...")
    Base.metadata.create_all(bind=engine)
    print("Done.")

if __name__ == "__main__":
    create_all_tables()
