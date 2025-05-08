from flask import Blueprint, request, jsonify
import mysql.connector
import bcrypt
from flask_cors import cross_origin


auth = Blueprint('auth', __name__)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="securitydb"
)
cursor = db.cursor(dictionary=True)

@auth.route('/signup', methods=['POST'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing username or password'}), 400

    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_pw))
        db.commit()
        return jsonify({'message': 'User created successfully'}), 201
    except mysql.connector.errors.IntegrityError:
        return jsonify({'error': 'Username already exists'}), 409
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@auth.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
    user = cursor.fetchone()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({'message': 'Login successful'}), 200
    return jsonify({'error': 'Invalid credentials'}), 401
