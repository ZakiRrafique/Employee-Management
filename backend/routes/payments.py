from flask import Blueprint, request, jsonify
import pymysql

payments_blueprint = Blueprint('payments', __name__)

db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="securitydb",
    cursorclass=pymysql.cursors.DictCursor
)
cursor = db.cursor()

@payments_blueprint.route('/payments', methods=['POST'])
def add_payment():
    data = request.get_json()

    employee_id = data.get("employeeId")
    amount = data.get("amount")
    payment_date = data.get("paymentDate")
    payment_method = data.get("paymentMethod")

    if not employee_id or not amount or not payment_date or not payment_method:
        return jsonify({"error": "Missing payment fields"}), 400

    try:
        cursor.execute(
            "INSERT INTO payments (employee_id, amount, payment_date, payment_method) VALUES (%s, %s, %s, %s)",
            (employee_id, amount, payment_date, payment_method)
        )
        db.commit()
        return jsonify({"message": "Payment added successfully!"}), 201
    except Exception as e:
        print("DB Error (Payment):", e)
        return jsonify({"error": "Payment insert failed"}), 500
@payments_blueprint.route('/payments', methods=['GET'])
def get_payments():
    try:
        cursor.execute("""
            SELECT payments.id, employees.name AS employee_name, amount, payment_date, payment_method
            FROM payments
            JOIN employees ON payments.employee_id = employees.id
            ORDER BY payment_date DESC
        """)
        payments = cursor.fetchall()
        return jsonify(payments)
    except Exception as e:
        print("DB Error (Get Payments):", e)
        return jsonify({"error": "Failed to fetch payments"}), 500
@payments_blueprint.route('/payments/<int:id>', methods=['DELETE'])
def delete_payment(id):
    try:
        cursor.execute("DELETE FROM payments WHERE id = %s", (id,))
        db.commit()
        return jsonify({'message': 'Payment deleted successfully'})
    except Exception as e:
        print("DB Error (Delete Payment):", e)
        return jsonify({'error': 'Payment deletion failed'}), 500

