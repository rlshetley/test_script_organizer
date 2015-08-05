from flask import make_response, request
from flask_restful import Resource
from app import db
from app.models import TestSuite, Project

class TestSuiteController(Resource):
    def get(self, testsuite_id):
        testSuite = TestSuite.query.filter(TestSuite.id == testsuite_id).first()
        return make_response(testSuite, 200)

    def put(self, testsuite_id):
        testSuite = TestSuite.query.filter(TestSuite.id == testsuite_id).first()

        testSuite.name = request.data['name']

        project = Project.query.filter(Project.id == request.data['project_id']).first()

        testSuite.project = project

        return make_response(testSuite, 201)

    def delete(self, testsuite_id):

        testSuite = Project.query.filter(TestSuite.id == testsuite_id).first()

        db.session.delete(testSuite)
        db.session.comiit()

        return make_response('', 204)


class TestSuiteListController(Resource):
    def get(self):
        return make_response(TestSuite.query.all(), 200)

    def post(self):
        testSuite = TestSuite()

        testSuite.name = request.data['name']

        project = Project.query.filter(Project.id == request.data['project_id']).first()

        testSuite.project = project

        db.session.add(testSuite)
        db.session.commit()

        return make_response(testSuite, 201)
