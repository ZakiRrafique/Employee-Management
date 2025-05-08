from flask import Flask, request, Blueprint, jsonify
from flask_cors import CORS
import bcrypt
import pymysql

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

conn = pymysql.connect(host='localhost', user='root', password='', db='securitydb', cursorclass=pymysql.cursors.DictCursor)
cursor = conn.cursor()

login_blueprint = Blueprint('login', __name__)

@login_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
      
        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):  # Assuming 'password' is the field name
            return jsonify({'message': 'Login successful'}), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
app.register_blueprint(login_blueprint, url_prefix='/backend')
if __name__ == '__main__':
    app.run(debug=True)

