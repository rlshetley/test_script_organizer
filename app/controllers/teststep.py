from flask import make_response, request
from flask.json import jsonify
from flask_restful import Resource
from app import db
from app.models import Test, TestStep

def map_test_step(test_step, request):
    test_step.name = request.data['name']
    test_step.action = request.data['action']
    test_step.description = request.data['description']
    test_step.expected_result = request.data['expected_result']
    test_step.step_number = request.data['step_number']

    return test_step

class TestStepController(Resource):
    def get(self, teststep_id):
        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        resp = jsonify(test_step.serialize())
        resp.status_code = 200

        return resp

    def put(self, teststep_id):
        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        test_step = map_test_step(test_step, request)

        test = Test.query.filter(Test.id == request.data['test_id']).first()

        test_step.test = test

        resp = jsonify(test_step.serialize())
        resp.status_code = 201

        return resp

    def delete(self, teststep_id):

        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        db.session.delete(test_step)
        db.session.comiit()

        return make_response('', 204)


class TestStepListController(Resource):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in TestStep.query.all()])
         resp.status_code = 200
         return resp

    def post(self):
        test_step = TestStep()

        test_step = map_test_step(test_step, request)

        test = Test.query.filter(Test.id == request.data['test_id']).first()

        test_step.test = test

        db.session.add(test_step)
        db.session.commit()

        resp = jsonify(test_step.serialize())
        resp.status_code = 201

        return resp
