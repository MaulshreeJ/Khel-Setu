# backend/init_db.py
import sys
from pathlib import Path

# Add the backend/app directory to the Python path
sys.path.append(str(Path(__file__).parent / "app"))

from app.db.session import engine
from app.db.models import Base

def init_database():
    """Create all tables in the database."""
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables created successfully!")

if __name__ == "__main__":
    init_database()