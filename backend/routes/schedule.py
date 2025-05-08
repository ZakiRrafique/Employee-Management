from flask import Blueprint, jsonify
import pymysql

schedule_blueprint = Blueprint('schedule', __name__)
db = pymysql.connect(
    host="localhost",
    user="root",
    password="",
    database="securitydb",
    cursorclass=pymysql.cursors.DictCursor
)
cursor = db.cursor()
@schedule_blueprint.route('/schedule', methods=['GET'])
def get_schedule():
    cursor.execute("SELECT * FROM schedule")
    schedules = cursor.fetchall()
    return jsonify(schedules)
