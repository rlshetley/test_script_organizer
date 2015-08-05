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
    testSuite = Column(Integer, ForeignKey('testSuite.id'))


class TestStep(Base):
    __tablename__ = 'test-steps'
    name = Column(String(225),  nullable=False)
    action = Column(String(225),  nullable=False)
    expectedResult = Column(String(225),  nullable=False)
    description = Column(String(225),  nullable=False)
    stepNumber = Column(Integer, nullable=False)
    test = Column(Integer, ForeignKey('test.id'))


class TestSession(Base):
    __tablename__ = 'test-sessions'
    name = Column(String(225),  nullable=False)
    server = Column(String(225),  nullable=False)
    browser = Column(String(225),  nullable=False)
    tester = Column(String(225),  nullable=False)
    test = Column(Integer, ForeignKey('test.id'))
    startDate = Column(DateTime)
    finishDate = Column(DateTime)


class TestResult(Base):
    __tablename__ = 'test-results'
    name = Column(String(225),  nullable=False)
    testStep = Column(Integer, ForeignKey('testStep.id'))
    actualResult = Column(String(225),  nullable=False)
    comments = Column(String(225),  nullable=False)
    testSession = Column(Integer, ForeignKey('testSession.id'))
    isPass = Column(Boolean)


class TestEvent(Base):
    __tablename__ = 'test-events'
    name = Column(String(225),  nullable=False)
    date = Column(DateTime)
    testSuite = Column(Integer, ForeignKey('testSuite.id'))
    project = Column(Integer, ForeignKey('project.id'))


class TestEventResult(Base):
    __tablename__ = 'test-event-results'
    testEvent = Column(Integer, ForeignKey('testEvent.id'))
    testSession = Column(Integer, ForeignKey('testSession.id'))
