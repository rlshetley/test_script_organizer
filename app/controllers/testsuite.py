from flask import make_response, request
from flask_restful import Resource
from app import db
from app.models import TestSuite, Project

class TestSuiteController(Resource):
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


class TestSuiteListController(Resource):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in TestSuite.query.all()])
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
