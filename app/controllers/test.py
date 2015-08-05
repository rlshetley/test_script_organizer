from flask import make_response, request
from flask_restful import Resource
from app import db
from app.models import TestSuite, Test

class TestController(Resource):
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


class TestListController(Resource):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in Test.query.all()])
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
