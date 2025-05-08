# crud.py
from sqlalchemy.orm import Session
from backend.db_models import Employee, Schedule, Hours, Payment

def get_employee(db: Session, employee_id: int):
    return db.query(Employee).filter(Employee.id == employee_id).first()

# Add other CRUD operations as needed
