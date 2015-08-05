from flask import make_response, request
from flask.json import jsonify
from flask_restful import Resource
from app import db
from app.models import Test, TestSession

def map_test_session(test_session, request):
    test_session.name = request.data['name']
    test_session.server = request.data['server']
    test_session.browser = request.data['browser']
    test_session.tester = request.data['tester']
    test_session.start_date = request.data['start_date']
    test_session.finish_date = request.data['finish_date']

    return test_session

class TestSessionController(Resource):
    def get(self, testsession_id):
        test_session = TestSession.query.filter(TestSession.id == testsession_id).first()

        resp = jsonify(test_session.serialize())
        resp.status_code = 200

        return resp

    def put(self, teststep_id):
        test_session = TestSession.query.filter(TestSession.id == testsession_id).first()

        test_session = map_test_session(test_session, request)

        test = Test.query.filter(Test.id == request.data['test_id']).first()

        test_session.test = test

        resp = jsonify(test_session.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testsession_id):

        test_session = TestSession.query.filter(TestSession.id == testsession_id).first()

        db.session.delete(test_session)
        db.session.comiit()

        return make_response('', 204)


class TestSessionListController(Resource):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in TestSession.query.all()])
         resp.status_code = 200
         return resp

    def post(self):
        test_session = TestSession()

        test_session = map_test_session(test_session, request)

        test = TestSession.query.filter(TestSession.id == request.data['test_id']).first()

        test_session.test = test

        db.session.add(test_session)
        db.session.commit()

        resp = jsonify(test_session.serialize())
        resp.status_code = 201

        return resp
