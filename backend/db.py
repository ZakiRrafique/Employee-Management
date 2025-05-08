from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base

SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Zongufone12!@localhost/security_db"

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency to get the database session
def get_db():
    db= SessionLocal()
    try:
        yield db
    finally:
        db.close()
