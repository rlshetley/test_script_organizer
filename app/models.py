from app import db
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean

class Base(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True)


class Project(Base):
    __tablename__ = 'projects'
    name = Column(String(225),  nullable=False)


class TestSuite(Base):
    __tablename__ = 'test-suites'
    name = Column(String(225),  nullable=False)
    project = Column(Integer, ForeignKey('project.id'))


class Test(Base):
    __tablename__ = 'tests'
    name = Column(String(225),  nullable=False)
    test_suite = Column(Integer, ForeignKey('testSuite.id'))


class TestStep(Base):
    __tablename__ = 'test-steps'
    name = Column(String(225),  nullable=False)
    action = Column(String(225),  nullable=False)
    expected_result = Column(String(225),  nullable=False)
    description = Column(String(225),  nullable=False)
    step_number = Column(Integer, nullable=False)
    test = Column(Integer, ForeignKey('test.id'))


class TestSession(Base):
    __tablename__ = 'test-sessions'
    name = Column(String(225),  nullable=False)
    server = Column(String(225),  nullable=False)
    browser = Column(String(225),  nullable=False)
    tester = Column(String(225),  nullable=False)
    test = Column(Integer, ForeignKey('test.id'))
    start_date = Column(DateTime)
    finish_date = Column(DateTime)


class TestResult(Base):
    __tablename__ = 'test-results'
    name = Column(String(225),  nullable=False)
    test_step = Column(Integer, ForeignKey('testStep.id'))
    actual_result = Column(String(225),  nullable=False)
    comments = Column(String(225),  nullable=False)
    test_session = Column(Integer, ForeignKey('testSession.id'))
    is_pass = Column(Boolean)


class TestEvent(Base):
    __tablename__ = 'test-events'
    name = Column(String(225),  nullable=False)
    date = Column(DateTime)
    test_suite = Column(Integer, ForeignKey('testSuite.id'))


class TestEventResult(Base):
    __tablename__ = 'test-event-results'
    test_event = Column(Integer, ForeignKey('testEvent.id'))
    test_session = Column(Integer, ForeignKey('testSession.id'))
