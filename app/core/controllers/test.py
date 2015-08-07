from flask import make_response, request
from flask.views import MethodView
from app import db, register_controller
from app.models import TestSuite, Test

class TestController(MethodView):
    def get(self, test_id):
        test = Test.query.filter(Test.id == test_id).first()

        resp = jsonify(test.serialize())
        resp.status_code = 200

        return resp

    def put(self, test_id):
        test = Test.query.filter(Test.id == test_id).first()

        test.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test.test_suite = test_suite

        resp = jsonify(test.serialize())
        resp.status_code = 201

        return resp

    def delete(self, test_id):

        test = Test.query.filter(Test.id == test_id).first()

        db.session.delete(test)
        db.session.comiit()

        return make_response('', 204)


class TestListController(MethodView):
    def get(self):
        results = []

        if 'project' in request.args:
            project_id = request.args.get('project')

            results = Test.query.filter(Test.project.id == project_id).all()
        else if 'testsuite' in request.args:
            test_suite_id = request.args.get('testsuite')

            results = Test.query.filter(Test.test_suite.id == test_suite_id).all()
        else:
            results = Test.query.all()

        resp = jsonify(json_list=[i.serialize() for i in results])
        resp.status_code = 200
        return resp

    def post(self):
        test = Test()

        test.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test.test_suite = test_suite

        db.session.add(test)
        db.session.commit()

        resp = jsonify(test.serialize())
        resp.status_code = 201

        return resp

register_controller(TestController, 'test_api', '/tests/<int:test_id>')
register_controller(TestListController, 'test_list_api', '/tests/', ['GET', 'POST'])
