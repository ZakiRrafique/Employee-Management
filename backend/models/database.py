# models/database.py
import mysql.connector
from config import db_config

def get_db_connection():
    try:
        db = mysql.connector.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            database=db_config['database']
        )
        cursor = db.cursor(dictionary=True)
        print("✅ Connected to MySQL database")
        return db, cursor
    except mysql.connector.Error as err:
        print("❌ Failed to connect to database:", err)
        exit(1)
