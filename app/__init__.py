# Import flask and template operators
from flask import Flask, render_template

# Import SQLAlchemy
from flask.ext.sqlalchemy import SQLAlchemy
from flask_restful import Api

app = Flask(__name__)
api = Api(app)

# Configurations
app.config.from_object('config')

# Define the database object which is imported
# by modules and controllers
db = SQLAlchemy(app)

from app.controllers import ProjectController, ProjectListController

api.add_resource(ProjectController, '/projects/<int:project_id>')
api.add_resource(ProjectListController, '/projects')
