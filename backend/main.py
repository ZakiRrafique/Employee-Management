from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from db_models import Employees, Base
from db import SessionLocal, engine, get_db
app = FastAPI()

# Allow frontend requests (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dummy data
dummy_schedule = [
    {"id": 1, "day": "Monday", "start_time": "2025-04-21T09:00:00", "end_time": "2025-04-21T17:00:00"},
    {"id": 2, "day": "Tuesday", "start_time": "2025-04-22T09:00:00", "end_time": "2025-04-22T17:00:00"},
]

dummy_hours = [
    {"id": 1, "hours_worked": 8},
    {"id": 2, "hours_worked": 7},
    {"id": 3, "hours_worked": 6},
]

dummy_payments = [
    {"id": 1, "amount": 150.00, "date": "2025-04-15"},
    {"id": 2, "amount": 200.00, "date": "2025-04-20"},
]
class EmployeeCreate(BaseModel):
    name: str
    phone: str
    assignedSite: str

@app.post("/backend/employees")
def add_employee(employee: EmployeeCreate, db: Session = Depends(get_db)):
    db_employee =Employees(name=employee.name, phone=employee.phone, assignedSite=employee.assignedSite)
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return {"message": "Employee added successfully!", "employee": db_employee}

@app.get("/api/employees")
def get_employees(db: Session = Depends(get_db)):
    employees = db.query(Employees).all()
    return employees
@app.get("/backend/employee/{employee_id}/schedule")
def get_schedule(employee_id: int):
    return dummy_schedule

@app.get("/backend/employee/{employee_id}/hours")
def get_hours(employee_id: int):
    return dummy_hours

@app.get("/backend/employee/{employee_id}/payments")
def get_payments(employee_id: int):
    return dummy_payments
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)