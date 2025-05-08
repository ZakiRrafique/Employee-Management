from flask import Blueprint, jsonify, request
import pymysql
import bcrypt
employees_blueprint = Blueprint('employees', __name__)
db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="securitydb",
    cursorclass=pymysql.cursors.DictCursor
)
cursor = db.cursor()
@employees_blueprint.route('/employee-login', methods=['POST'])
def employee_login():
    data = request.json
    employee_id = data.get('employeeId')
    password = data.get('password')

    if not employee_id or not password:
        return jsonify({'error': 'Missing employee ID or password'}), 400

    try:
        cursor.execute("SELECT * FROM employees WHERE employee_id = %s", (employee_id,))
        employee = cursor.fetchone()

        if employee and bcrypt.checkpw(password.encode('utf-8'), employee['password'].encode('utf-8')):
            return jsonify({'success': True, 'message': 'Login successful'})
        else:
            return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

    except Exception as e:
        print("DB Error:", e)
        return jsonify({'error': 'Database error'}), 500
