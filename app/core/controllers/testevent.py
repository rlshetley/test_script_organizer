from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.core.models import TestSuite, TestEvent, Project
from datetime import datetime

class TestEventController(MethodView):
    def get(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        if test_event is None:
            return make_response('', 404)

        resp = jsonify(test_event.serialize())
        resp.status_code = 200

        return resp

    def put(self, testevent_id):
        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        test_event.name = request.json_data['name']

        test_suite = TestSuite.query.filter(TestSuite.id == request.json_data['testSuite']).first()

        test_event.test_suite = test_suite.id

        resp = jsonify(test_event.serialize())
        resp.status_code = 201

        return resp

    def delete(self, testevent_id):

        test_event = TestEvent.query.filter(TestEvent.id == testevent_id).first()

        db.session.delete(test_event)
        db.session.commit()

        return make_response('', 204)


class TestEventListController(MethodView):
    def get(self):
        results = []

        if 'testsuite' in request.args:
            test_suite_id = request.args.get('testsuite')

            results = TestEvent.query.filter(TestEvent.test_suite == test_suite_id).all()
        elif 'project' in request.args:
            project_id = request.args.get('project')
            results = db.session.query(TestEvent).join(TestSuite).join(Project).filter(Project.id == project_id).all()
        else:
            results = TestEvent.query.all()

        resp = jsonify(testEvents=[i.serialize() for i in results])
        resp.status_code = 200
        return resp

    def post(self):
        test_event = TestEvent()

        test_event.name = request.json_data['name']
        test_event.date = datetime.now()

        test_suite = TestSuite.query.filter(TestSuite.id == request.json_data['testSuite']).first()

        test_event.test_suite = test_suite.id

        db.session.add(test_event)
        db.session.commit()

        resp = jsonify(test_event.serialize())
        resp.status_code = 201

        return resp

register_controller(TestEventController, 'test_event_api', '/testevents/<int:testevent_id>/')
register_controller(TestEventListController, 'test_event_list_api', '/testevents/', ['GET', 'POST'])
