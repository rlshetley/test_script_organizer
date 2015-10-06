# PyYaml
import yaml

from app.core.models import *
from app.users.models import *
from app import db
from dateutil.parser import parse

stream = open('data.yaml', 'r')

data = yaml.load(stream)

User.query.delete()
for user in data['users']:
    user_db = User(user_name=user['username'])

    user_db.set_password(user['password'])
    db.session.add(user_db)

db.session.commit()

tests = []
test_suites = []
test_steps = []

TestResult.query.delete()
TestSession.query.delete()
TestEvent.query.delete()
TestStep.query.delete()
Test.query.delete()
TestSuite.query.delete()
Project.query.delete()

for project in data['projects']:
    project_db = Project(name=project['name'])
    db.session.add(project_db)
    db.session.commit()

    if 'test_suites' in project:
        for test_suite in project['test_suites']:
            test_suite_db = TestSuite(name=test_suite['name'], project=project_db.id)
            
            db.session.add(test_suite_db)
            db.session.commit()
            test_suites.append(test_suite_db)

            if 'tests' in test_suite:
                for test in test_suite['tests']:
                    test_db = Test(**{i:test[i] for i in test if i!='test_steps'})
                    test_db.test_suite = test_suite_db.id
            
                    db.session.add(test_db)
                    db.session.commit()
                    tests.append(test_db)

                    for test_step in test['test_steps']:
                        test_step_db = TestStep(**test_step)
                        test_step_db.test = test_db.id
                        
                        db.session.add(test_step_db)
                        db.session.commit()
                        test_steps.append(test_step_db)
                        
    if 'test_events' in project:
        for test_event in project['test_events']:
            test_event_db = TestEvent(name=test_event['name'], date=test_event['date'])

            test_suite = next((x for x in test_suites if x.name == test_event['test_suite']), None)
            
            if test_suite is not None:
                test_event_db.test_suite = test_suite.id
                
            test_event_db.date = parse(test_event_db.date)

            db.session.add(test_event_db)
            db.session.commit()
             
            for test_session in test_event['test_sessions']:
                test_session_db = TestSession(**{i:test_session[i] for i in test_session if i !='test_results' and i != 'test'})

                test = next((x for x in tests if x.name == test_session['test']), None)

                if test is not None:
                    test_session_db.test = test.id
                    
                test_session_db.start_date = parse(test_session_db.start_date)
                test_session_db.finish_date = parse(test_session_db.finish_date)
                    
                db.session.add(test_session_db)
                db.session.commit()

                for test_result in test_session['test_results']:
                    test_result_db = TestResult(**{i:test_result[i] for i in test_result if i!='test_step'})

                    test_result_db.test_session = test_session_db.id

                    test_step = next((x for x in test_steps if x.name == test_result['test_step']), None)

                    if test_step is not None:
                        test_result_db.test_step = test_step.id
                        
                    db.session.add(test_result_db)
                    db.session.commit()