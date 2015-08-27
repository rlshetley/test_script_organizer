# Set up the configuration for testing
import os
os.environ['TSO_CFG'] = 'config.TestConfig'

from app import app, db
from app.core.models import *
from datetime import datetime


def before_all(context):
    context.app = app.test_client()
    db.create_all()


def after_all(context):
    db.session.remove()
    db.drop_all()


def before_feature(context, feature):
    context.feature.defaults = {}

    project = Project()
    project.name = 'test_default'
    db.session.add(project)
    db.session.commit()
    context.feature.defaults['Project'] = project.id

    test_suite = TestSuite()
    test_suite.name = 'test_suite_default'
    test_suite.project = project.id
    db.session.add(test_suite)
    db.session.commit()
    context.feature.defaults['TestSuite'] = test_suite.id

    test = Test()
    test.name = 'test_default'
    test.test_suite = test_suite.id
    db.session.add(test)
    db.session.commit()
    context.feature.defaults['Test'] = test.id

    test_event = TestEvent()
    test_event.name = 'test_event_default'
    test_event.date = datetime.now()
    test_event.test_suite = test_suite.id
    db.session.add(test_event)
    db.session.commit()
    context.feature.defaults['TestEvent'] = test_event.id

    test_step = TestStep()
    test_step.name = 'test_step'
    test_step.action = 'action'
    test_step.expected_result = 'result'
    test_step.description = 'my description'
    test_step.step_number = 1
    test_step.test = test.id
    db.session.add(test_step)
    db.session.commit()
    context.feature.defaults['TestStep'] = test_step.id

    test_session = TestSession()
    test_session.name = 'test_session_default'
    test_session.server = 'my server'
    test_session.browser = 'chrome'
    test_session.tester = 'tester'
    test_session.test = test.id
    test_session.start_date = datetime.now()
    test_session.finish_date = datetime.now()
    db.session.add(test_session)
    db.session.commit()
    context.feature.defaults['TestSession'] = test_session.id
