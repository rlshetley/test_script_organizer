from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.core.models import Test, TestStep


def map_test_step(test_step, request):
    test_step.name = request.json_data['name']
    test_step.action = request.json_data['action']
    test_step.description = request.json_data['description']
    test_step.expected_result = request.json_data['expectedResult']
    test_step.step_number = request.json_data['stepNumber']

    test = Test.query.filter(Test == request.json_data['test']).first()

    test_step.test = test

    return test_step


class TestStepController(MethodView):
    def get(self, teststep_id):
        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        resp = jsonify(test_step.serialize())
        resp.status_code = 200

        return resp

    def put(self, teststep_id):
        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        test_step = map_test_step(test_step, request)

        resp = jsonify(test_step.serialize())
        resp.status_code = 201

        return resp

    def delete(self, teststep_id):
        test_step = TestStep.query.filter(TestStep.id == teststep_id).first()

        db.session.delete(test_step)
        db.session.comiit()

        return make_response('', 204)


class TestStepListController(MethodView):
    def get(self):
        results = []

        if 'test' in request.args:
            test_id = request.args.get('test')

            results = TestStep.query.filter(TestStep.test == test_id).all()
        else:
            results = TestStep.query.all()

        resp = jsonify(test_steps=[i.serialize() for i in results])
        resp.status_code = 200
        return resp

    def post(self):
        test_step = TestStep()

        test_step = map_test_step(test_step, request)

        db.session.add(test_step)
        db.session.commit()

        resp = jsonify(test_step.serialize())
        resp.status_code = 201

        return resp


register_controller(TestStepController, 'test_step_api', '/teststeps/<int:teststep_id>')
register_controller(TestStepListController, 'test_step_list_api', '/teststeps/', ['GET', 'POST'])
