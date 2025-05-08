from flask import Flask, request, jsonify, Blueprint
from flask_cors import CORS
import bcrypt
import pymysql

app = Flask(__name__)
CORS(app, origins="http://localhost:3000")

signup_blueprint = Blueprint('signup', __name__)
conn = pymysql.connect(host='localhost', user='root', password='', db='securitydb', cursorclass=pymysql.cursors.DictCursor)
cursor = conn.cursor()

@signup_blueprint.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return '', 200 

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Missing fields'}), 400
    hashed_pw = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    try:
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_pw))
        conn.commit()
        return jsonify({'message': 'Signup successful'}), 201
    except Exception as e:
        print("Signup Error:", e)
        return jsonify({'error': 'Signup failed or username already exists'}), 500
app.register_blueprint(signup_blueprint, url_prefix='/backend')

if __name__ == '__main__':
    app.run(debug=True)
