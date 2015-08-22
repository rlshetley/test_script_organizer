from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.core.models import Test, TestSession

def map_test_session(test_session, request):
    test_session.name = "Test"
    test_session.server = request.json_data['server']
    test_session.browser = request.json_data['browser']
    test_session.tester = request.json_data['tester']
    test_session.start_date = request.json_data['startDate']
    test_session.finish_date = request.json_data['finishDate']

    return test_session

class TestSessionController(MethodView):
    def get(self, testsession_id):
        test_session = TestSession.query.filter(TestSession.id == testsession_id).first()

        resp = jsonify(test_session.serialize())
        resp.status_code = 200

        return resp

    def put(self, testsession_id):
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


class TestSessionListController(MethodView):
    def get(self):
         resp = jsonify(test_sessions=[i.serialize() for i in TestSession.query.all()])
         resp.status_code = 200
         return resp

    def post(self):
        test_session = TestSession()

        test_session = map_test_session(test_session, request)

        test = TestSession.query.filter(TestSession.id == request.json_data['test']).first()

        test_session.test = test.id

        db.session.add(test_session)
        db.session.commit()

        resp = jsonify(test_session.serialize())
        resp.status_code = 201

        return resp

register_controller(TestSessionController, 'test_session_api', '/testsessions/<int:testsession_id>')
register_controller(TestSessionListController, 'test_session_list_api', '/testsessions/', ['GET', 'POST'])
