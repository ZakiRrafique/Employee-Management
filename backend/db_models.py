from sqlalchemy import Column, Integer, String
from db import Base

class Employee(Base):
    __tablename__ = 'employees'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    phone = Column(String(20), nullable=False)
    assigned_site = Column(String(100), nullable=False)
