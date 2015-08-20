from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.core.models import TestEventResult, TestSession, TestEvent

def map_test_event_result(test__event_result, request):

    test_event = TestEvent.query.filter(TestEvent.id == request.data['testevent_id']).first()

    test__event_result.test_event = test_event

    test_session = TestSession.query.filter(TestSession.id == request.data['testsession_id']).first()

    test__event_result.test_session = test_session

    return test__event_result

class TestEventResultController(MethodView):
    def get(self, testeventresult_id):
        test_event_result = TestEventResult.query.filter(TestEventResult.id == testeventresult_id).first()

        resp = jsonify(test_event_result.serialize())
        resp.status_code = 200

        return resp

    def put(self, testeventresult_id):
        test_event_result = TestEventResult.query.filter(TestEventResult.id == testeventresult_id).first()

        test_event_result = map_test_event_result(test_event_result, request)

        resp = jsonify(test_event_result.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testeventresult_id):

        test_event_result = TestEventResult.query.filter(TestEventResult.id == testeventresult_id).first()

        db.session.delete(test_event_result)
        db.session.comiit()

        return make_response('', 204)


class TestEventResultListController(MethodView):
    def get(self):
         resp = jsonify(test_event_results=[i.serialize() for i in TestEventResult.query.all()])
         resp.status_code = 200
         return resp

    def post(self):
        test_event_result = TestEventResult()

        test_event_result = map_test_event_result(test_event_result, request)

        db.session.add(test_event_result)
        db.session.commit()

        resp = jsonify(test_event_result.serialize())
        resp.status_code = 201

        return resp

register_controller(TestEventResultController, 'test_event_result_api', '/testeventresults/<int:testeventresult_id_id>')
register_controller(TestEventResultListController, 'test_event_result_list_api', '/testeventresults/', ['GET', 'POST'])
