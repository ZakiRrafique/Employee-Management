import bcrypt
import pymysql
conn = pymysql.connect(host='localhost', user='root', password='', db='securitydb', cursorclass=pymysql.cursors.DictCursor)
cursor = conn.cursor()
username = 'adminuser'
password = 'adminpass'
hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
try:
    cursor.execute("INSERT INTO admin (username, password) VALUES (%s, %s)", (username, hashed_password.decode('utf-8')))
    conn.commit()
    print("Admin user inserted successfully.")
except Exception as e:
    print("Error inserting admin user:", e)
finally:
    cursor.close()
    conn.close()
