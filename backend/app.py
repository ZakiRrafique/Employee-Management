from flask import Flask
from flask_cors import CORS
from routes.employees import employees_blueprint
from routes.payments import payments_blueprint

from routes.signup import signup_blueprint

from routes.login import login_blueprint

from routes.admin import admin_blueprint

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.register_blueprint(employees_blueprint, url_prefix='/backend')
app.register_blueprint(payments_blueprint, url_prefix="/backend")
app.register_blueprint(signup_blueprint, url_prefix="/backend")

app.register_blueprint(login_blueprint, url_prefix="/backend")
app.register_blueprint(admin_blueprint, url_prefix="/backend")


if __name__ == '__main__':
  
    app.run(host='127.0.0.1', port=5000, debug=True)
