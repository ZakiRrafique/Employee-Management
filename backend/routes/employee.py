from flask import Blueprint, request, jsonify
from models.database import get_db_connection
from flask_cors import cross_origin

employee = Blueprint('employee', __name__)
@employee.route('/backend/employees', methods=['POST'])
@cross_origin()
def add_employee():
    data = request.get_json()
    print("Received data:", data) 

    name = data.get('name')
    phone = data.get('phone')
    assigned_site = data.get('assigned_site')
    print(f"Name: {name}, Phone: {phone}, Assigned Site: {assigned_site}")
    
    if not name or not phone or not assigned_site:
        return jsonify({"error": "Missing fields"}), 400

    db, cursor = get_db_connection()

    try:
        cursor.execute(
            "INSERT INTO employees (name, phone, assigned_site) VALUES (%s, %s, %s)",
            (name, phone, assigned_site)
        )
        db.commit()
        return jsonify({"message": "Employee added successfully"}), 201
    except Exception as e:
        print("Database error:", e)
        return jsonify({"error": "Internal server error"}), 500
    finally:
        cursor.close()
        db.close()
