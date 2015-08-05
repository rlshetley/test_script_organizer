from flask import make_response, request
from flask_restful import Resource
from app import db
from app.models import TestSuite, TestEvent

class TestEventController(Resource):
    def get(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()
        return make_response(test_event, 200)

    def put(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        test_event.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test_event.test_suite = test_suite

        return make_response(test_event, 201)

    def delete(self, testevent_id):

        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        db.session.delete(test_event)
        db.session.comiit()

        return make_response('', 204)


class TestEventListController(Resource):
    def get(self):
        return make_response(TestEvent.query.all(), 200)

    def post(self):
        test_event = TestEvent()

        test_event.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test_event.test_suite = test_suite

        db.session.add(test_event)
        db.session.commit()

        return make_response(test_event, 201)
