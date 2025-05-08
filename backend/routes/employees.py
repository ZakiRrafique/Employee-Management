from flask import Flask, Blueprint, jsonify, request
import mysql.connector
from flask_cors import CORS


employees_blueprint = Blueprint('employees', __name__)
import pymysql
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="securitydb",
    cursorclass=pymysql.cursors.DictCursor
)
cursor = db.cursor()

@employees_blueprint.route('/employees', methods=['GET'])
def get_employees():
    cursor.execute("SELECT * FROM employees")
    employees = cursor.fetchall()
    return jsonify(employees)
@employees_blueprint.route('/employees/<int:id>', methods=['DELETE'])
def delete_employee(id):
    cursor.execute("DELETE FROM employees WHERE id = %s", (id,))
    db.commit()
    return jsonify({'message': 'Employee deleted successfully'})
@employees_blueprint.route('/employees/<int:id>', methods=['PUT'])
def update_employee(id):
    data = request.json
    cursor.execute(
        "UPDATE employees SET name=%s, role=%s, assigned_site=%s, contact=%s WHERE id=%s",
        (data['name'], data['role'], data['assigned_site'], data['contact'], id)
    )
    db.commit()
    return jsonify({'message': 'Employee updated successfully'})
@employees_blueprint.route('/employees', methods=['POST'])
def add_employee():
    data = request.json

    name = data.get('name')
    phone = data.get('phone')
    assigned_site = data.get('assignedSite')
    schedule_shift = data.get('schedule_shift')
    schedule_time = data.get('schedule_time')

    if not name or not phone or not assigned_site or not schedule_shift or not schedule_time:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        cursor.execute(
            "INSERT INTO employees (name, contact, assigned_site, schedule_shift, schedule_time) VALUES (%s, %s, %s, %s, %s)",
            (name, phone, assigned_site, schedule_shift, schedule_time)
        )
        db.commit()
        return jsonify({'message': 'Employee added successfully'}), 201
    except Exception as e:
        print("DB Error:", e)
        return jsonify({'error': 'Database insert failed'}), 500
@employees_blueprint.route('/schedule', methods=['POST'])
def add_schedule():
    data = request.get_json()
    employee_name = data.get("employeeName")
    assigned_site = data.get("assignedSite")
    scheduled_time = data.get("scheduledTime")
    conn = sqlite3.connect("yourdb.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO schedule (employee_name, assigned_site, scheduled_time) VALUES (?, ?, ?)",
                   (employee_name, assigned_site, scheduled_time))
    conn.commit()
    conn.close()

    return jsonify({"message": "Schedule added successfully!"})
@employees_blueprint.route('/employees/<int:id>/schedule', methods=['PUT'])
def update_schedule(id):
    data = request.json
    schedule_shift = data.get('schedule_shift')
    schedule_time = data.get('schedule_time')

    if not schedule_shift or not schedule_time:
        return jsonify({'error': 'Missing schedule shift or time'}), 400

    cursor.execute(
        "UPDATE employees SET schedule_shift=%s, schedule_time=%s WHERE id=%s",
        (schedule_shift, schedule_time, id)
    )
    db.commit()

    return jsonify({'message': 'Employee schedule updated successfully'})
