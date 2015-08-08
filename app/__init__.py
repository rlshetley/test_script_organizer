# Import flask and template operators
from flask import Flask, request
import json

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy

# Import Basic Authentication modules
from flask.ext.httpauth import HTTPBasicAuth

app = Flask(__name__, static_folder='static')

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

@app.route('/<string:page_name>/')
def static_page(page_name):
    return app.send_static_file('%s.html' % page_name)


def register_controller(controller, endpoint, url, methods=['GET', 'PUT', 'DELETE']):
    """
    Registers a controller with the application

    Args:
        controller (MethodView): The controller class to create
        endpoint (str): The name of teh endpoint
        url (str): The url to map
        methods (list):  The HTTP method to map - Defaults to GET, PUT, and DELETE

    """
    view_func = controller.as_view(endpoint)
    app.add_url_rule("/api%s" % url, view_func=view_func, methods=methods)

from app.core.controllers import project, test, testevent, testeventresult, testresult, testsession, teststep, testsuite
from app.roles.controllers import RoleController, RoleUsersController
from app.user_admin.controllers import UserController, UserListController