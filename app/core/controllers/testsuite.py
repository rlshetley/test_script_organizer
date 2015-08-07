from flask import make_response, request
from flask.views import MethodView
from app import db, register_controller
from app.models import TestSuite, Project

class TestSuiteController(MethodView):
    def get(self, testsuite_id):
        test_suite = TestSuite.query.filter(TestSuite.id == testsuite_id).first()

        resp = jsonify(test_suite.serialize())
        resp.status_code = 200

        return resp

    def put(self, testsuite_id):
        test_suite = TestSuite.query.filter(TestSuite.id == testsuite_id).first()

        test_suite.name = request.data['name']

        project = Project.query.filter(Project.id == request.data['project_id']).first()

        test_suite.project = project

        resp = jsonify(test_suite.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testsuite_id):

        testSuite = Project.query.filter(TestSuite.id == testsuite_id).first()

        db.session.delete(testSuite)
        db.session.comiit()

        return make_response('', 204)


class TestSuiteListController(MethodView):
    def get(self):
        results = []

        if 'project' in request.args:
            project_id = request.args.get('project')

            results = TestSuite.query.filter(TestSuite.project.id == project_id).all()
        else:
            results = TestSuite.query.all()

         resp = jsonify(json_list=[i.serialize() for i in results])
         resp.status_code = 200
         return resp

    def post(self):
        test_suite = TestSuite()

        test_suite.name = request.data['name']

        project = Project.query.filter(Project.id == request.data['project_id']).first()

        test_suite.project = project

        db.session.add(test_suite)
        db.session.commit()

        resp = jsonify(test_suite.serialize())
        resp.status_code = 201

        return resp

register_controller(TestSuiteController, 'test_suite_api', '/testsuites/<int:testsuite_id>')
register_controller(TestSuiteListController, 'test_suite_list_api', '/testsuites/', ['GET', 'POST'])
