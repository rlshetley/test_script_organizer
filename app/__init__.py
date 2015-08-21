# Import flask and template operators
from flask import Flask, request
import json
import os
import logging

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy

# Import Basic Authentication modules
from flask.ext.httpauth import HTTPBasicAuth

ASSETS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

app = Flask(__name__, template_folder=ASSETS_DIR, static_folder=ASSETS_DIR)

auth = HTTPBasicAuth()

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

@app.before_request
def before_request():
    if request.method in ['POST', 'PUT', 'PATCH']:
        data = request.get_data(as_text=True)
        request.json_data = json.loads(data)


def register_controller(controller, endpoint, url, methods=['GET', 'PUT', 'DELETE']):
    """
    Registers a controller with the application

    Args:
        controller (MethodView): The controller class to create
        endpoint (str): The name of teh endpoint
        url (str): The url to map
        methods (list):  The HTTP method to map - Defaults to GET, PUT, and DELETE

    """
    print("Registering url %s" % url)
    view_func = controller.as_view(endpoint)
    app.add_url_rule("/api%s" % url, view_func=view_func, methods=methods)

from app.core.controllers import project, test, testevent, testeventresult, testresult, testsession, teststep, testsuite
from app.roles.controllers import RoleController, RoleUsersController
from app.user_admin.controllers import UserController, UserListController