# PyYaml
import yaml

from app.core.models import *
from app.users.models import *

stream = open('data.yaml', 'r')

data = yaml.load(stream)

for user in data['users']:
    user_db = User(username=user['username'])

    user_db.set_password(user['password'])

tests = []
test_suites = []
test_steps = []

for project in data['projects']:
    project_db = Project(name=project['name'])

    if 'test_suites' in project:
        for test_suite in project['test_suites']:
            test_suite_db = TestSuite(name=test_suite['name'], project=project_db.id)

            if 'tests' in test_suite:
                for test in test_suite['tests']:
                    test_db = Test(**{i:test[i] for i in test if i!='test_steps'})
                    test_db.test_suite = test_suite_db.id

                    for test_step in test['test_steps']:
                        test_step_db = TestStep(**test_step)
                        test_step_db.test = test_db.id

    if 'test_events' in project:
        for test_event in project['test_events']:
            test_event_db = TestEvent(name=test_event['name'], date=test_event['date'])

            test_suite = next((x for x in test_suites if x.name == test_suites['test_suite']), None)

            if test_suite is not None:
                test_event_db.test_suite = test_suite.id

            for test_session in test_event['test_sessions']:
                test_session_db = TestSession(**{i:test_session[i] for i in test_session if i !='test_results' and i != 'test'})

                test = next((x for x in tests if x.name == test_session['test']), None)

                if test is not None:
                    test_session_db.test = test.id

                for test_result in test_session['test_results']:
                    test_result_db = TestResult(**{i:test_result[i] for i in test_result if i!='test_step'})

                    test_result_db.test_session = test_session_db.id

                    test_step = next((x for x in test_steps if x.name == test_result['test_step']), None)

                    if test_step is not None:
                        test_result_db.test_step = test_step.id
