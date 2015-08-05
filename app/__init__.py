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

from app.controllers.project import ProjectController, ProjectListController
from app.controllers.testsuite import TestSuiteController, TestSuiteListController
from app.controllers.test import TestController, TestListController
from app.controllers.testsession import TestSessionController, TestSessionListController
from app.controllers.testevent import TestEventController, TestEventListController
from app.controllers.teststep import TestStepController, TestStepListController

api.add_resource(ProjectController, '/projects/<int:testsuite_id>')
api.add_resource(ProjectListController, '/projects/')

api.add_resource(TestSuiteController, '/testsuites/<int:testsuite_id>')
api.add_resource(TestSuiteListController, '/testsuites/')

api.add_resource(TestController, '/tests/<int:test_id>')
api.add_resource(TestListController, '/tests/')

api.add_resource(TestSessionController, '/testsessions/<int:testsession_id>')
api.add_resource(TestSessionListController, '/testsessions/')

api.add_resource(TestEventController, '/testevents/<int:testevent_id>')
api.add_resource(TestEventListController, '/testevents/')

api.add_resource(TestStepController, '/teststeps/<int:teststep_id>')
api.add_resource(TestStepListController, '/teststeps/')

db.create_all()
