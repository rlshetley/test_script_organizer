# Import flask and template operators
from flask import Flask, render_template

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy

# Import Flask-restful
from flask_restful import Api

# Import Basic Authentication modules
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__)
api = Api(app)
auth = HTTPBasicAuth()

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

def register_controller(controller, endpoint, url, methods=['GET', 'PUT', 'DELETE']):
    view_func = auth.login_required(controller.as_view(endpoint))
    app.add_url_rule(url, view_func=view_func, methods=methods)

db.create_all()
