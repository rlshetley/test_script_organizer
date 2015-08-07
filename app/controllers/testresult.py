from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.models import TestResult, TestStep, TestSession

def map_test_result(test_result, request):
    test_result.name = request.data['name']
    test_result.action = request.data['actual_results']
    test_result.description = request.data['comments']
    test_result.expected_result = request.data['is_pass']

    test_step = TestStep.query.filter(TestStep.id == request.data['teststep_id']).first()

    test_result.test_step = test_step

    test_session = TestSession.query.filter(TestSession.id == request.data['testsession_id']).first()

    test_result.test_session = test_session

    return test_result

class TestResultController(MethodView):
    def get(self, testresult_id):
        test_result = TestResult.query.filter(TestResult.id == testresult_id).first()

        resp = jsonify(test_result.serialize())
        resp.status_code = 200

        return resp

    def put(self, testresult_id):
        test_result = TestResult.query.filter(TestResult.id == testresult_id).first()

        test_result = map_test_result(test_result, request)

        resp = jsonify(test_result.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testresult_id):

        test_result = TestResult.query.filter(TestResult.id == testresult_id).first()

        db.session.delete(test_result)
        db.session.comiit()

        return make_response('', 204)


class TestResultListController(MethodView):
    def get(self):
        results = []

        if 'testsession' in request.args:
            test_session_id = request.args.get('testsession')
            results = TestResult.query.filter(TestResult.test_session == test_session_id).all()
        else:
            results = TestResult.query.all()

         resp = jsonify(json_list=[i.serialize() for i in results])
         resp.status_code = 200
         return resp

    def post(self):
        test_result = TestResult()

        test_result = map_test_result(test_result, request)

        db.session.add(test_result)
        db.session.commit()

        resp = jsonify(test_result.serialize())
        resp.status_code = 201

        return resp

register_controller(TestResultController, 'test_result_api', '/testresults/<int:testresult_id>')
register_controller(TestResultListController, 'test_result_list_api', '/testresults/', ['GET', 'POST'])
