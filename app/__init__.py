# Import flask and template operators
from flask import Flask, request, g, jsonify, send_from_directory, make_response
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
tso_cfg = os.environ.get("TSO_CFG", "config.Config")

app.config.from_object(tso_cfg)

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

@app.before_request
def before_request():
    """
    Converts request data to JSON

    If a request is a POST, PUT, or PATCH, then this method
    will convert the data from binary to JSON and set the
    json_data property on the request
    """
    if request.method in ['POST', 'PUT', 'PATCH']:
        data = request.get_data(as_text=True)
        request.json_data = json.loads(data)
        
@app.after_request
def add_header(response):
    response.headers['WWW-Authenticate'] = 'xBasic: api'
    return response


def register_controller(controller, endpoint, url, methods=['GET', 'PUT', 'DELETE']):
    """
    Registers a controller with the application

    Args:
        controller (MethodView): The controller class to create
        endpoint (str): The name of the endpoint
        url (str): The url to map
        methods (list):  The HTTP method to map - Defaults to GET, PUT, and DELETE

    """
    app.logger.debug("Registering url %s" % url)
    view_func = controller.as_view(endpoint)
    app.add_url_rule("/api%s" % url, view_func=view_func, methods=methods)

# Import all the controllers so that they can register
from app.core.controllers import project, test, testevent, testeventresult, testresult, testsession, teststep, testsuite
from app.roles.controllers import RoleController, RoleUsersController
from app.users.controllers import UserController, UserListController

@app.route('/api/token/')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token(600)
    return jsonify({'token': token.decode('ascii'), 'duration': 600, 'user': g.user.serialize()})

@app.route('/') 
def basic_pages(**kwargs): 
    return make_response(open('app/static/index.html').read()) 

