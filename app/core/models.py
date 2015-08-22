from app import db
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean

class Base(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True)


class Project(Base):
    __tablename__ = 'projects'
    name = Column(String(225),  nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }


class TestSuite(Base):
    __tablename__ = 'test-suites'
    name = Column(String(225),  nullable=False)
    project = Column(Integer, ForeignKey('projects.id'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'project_id': self.project
        }


class Test(Base):
    __tablename__ = 'tests'
    name = Column(String(225),  nullable=False)
    test_suite = Column(Integer, ForeignKey('test-suites.id'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'testsuite_id': self.test_suite
        }


class TestStep(Base):
    __tablename__ = 'test-steps'
    name = Column(String(225),  nullable=False)
    action = Column(String(225),  nullable=False)
    expected_result = Column(String(225),  nullable=False)
    description = Column(String(225),  nullable=False)
    step_number = Column(Integer, nullable=False)
    test = Column(Integer, ForeignKey('tests.id'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'action': self.action,
            'expectedResult': self.expected_result,
            'description': self.description,
            'stepNumber': self.step_number,
            'test_id': self.test
        }


class TestSession(Base):
    __tablename__ = 'test-sessions'
    name = Column(String(225),  nullable=False)
    server = Column(String(225),  nullable=False)
    browser = Column(String(225),  nullable=False)
    tester = Column(String(225),  nullable=False)
    test = Column(Integer, ForeignKey('tests.id'))
    start_date = Column(DateTime)
    finish_date = Column(DateTime)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'server': self.server,
            'browser': self.browser,
            'tester': self.tester,
            'test_id': self.test,
            'start_date': self.start_date,
            'finish_date': self.finish_date
        }


class TestResult(Base):
    __tablename__ = 'test-results'
    name = Column(String(225),  nullable=False)
    test_step = Column(Integer, ForeignKey('test-steps.id'))
    actual_result = Column(String(225),  nullable=False)
    comments = Column(String(225),  nullable=False)
    test_session = Column(Integer, ForeignKey('test-sessions.id'))
    is_pass = Column(Boolean)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'actual_result': self.actual_result,
            'comments': self.comments,
            'is_pass': self.is_pass,
            'testStep_id': self.test_step,
            'testSession_id': self.test_session
        }


class TestEvent(Base):
    __tablename__ = 'test-events'
    name = Column(String(225),  nullable=False)
    date = Column(DateTime)
    test_suite = Column(Integer, ForeignKey('test-suites.id'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'testSuite_id': self.test_suite
        }


class TestEventResult(Base):
    __tablename__ = 'test-event-results'
    test_event = Column(Integer, ForeignKey('test-events.id'))
    test_session = Column(Integer, ForeignKey('test-sessions.id'))

    def serialize(self):
        return {
            'id': self.id,
            'test_event': self.test_event.serialize(),
            'test_session': self.test_session.serialize()
        }
