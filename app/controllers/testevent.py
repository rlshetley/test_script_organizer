from flask import make_response, request
from flask.json import jsonify
from flask_restful import Resource
from app import db
from app.models import TestSuite, TestEvent

class TestEventController(Resource):
    def get(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        resp = jsonify(test_event.serialize())
        resp.status_code = 200

        return resp

    def put(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        test_event.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test_event.test_suite = test_suite

        resp = jsonify(test_event.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testevent_id):

        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        db.session.delete(test_event)
        db.session.comiit()

        return make_response('', 204)


class TestEventListController(Resource):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in TestEvent.query.all()])
         resp.status_code = 200
         return resp

    def post(self):
        test_event = TestEvent()

        test_event.name = request.data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.data['testsuite_id']).first()

        test_event.test_suite = test_suite

        db.session.add(test_event)
        db.session.commit()

        resp = jsonify(test_event.serialize())
        resp.status_code = 201

        return resp
