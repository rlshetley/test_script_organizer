from app import db
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean
from sqlalchemy.orm import relationship

class Base(db.Model):
    __abstract__ = True
    id = Column(Integer, primary_key=True)


class Project(Base):
    __tablename__ = 'projects'
    name = Column(String(225),  nullable=False)
    test_suites= relationship("TestSuite", back_populates="projectInstance")
    

    def serialize(self):
        test_suites = [i.serialize() for i in self.test_suites]
        return {
            'id': self.id,
            'name': self.name,
            'testSuitesCount': len(test_suites)
        }


class TestSuite(Base):
    __tablename__ = 'test-suites'
    name = Column(String(225),  nullable=False)
    project = Column(Integer, ForeignKey('projects.id'))
    projectInstance = relationship("Project", back_populates="test_suites")

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'project': self.project
        }


class Test(Base):
    __tablename__ = 'tests'
    name = Column(String(225),  nullable=False)
    test_suite = Column(Integer, ForeignKey('test-suites.id'))

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'testsuite': self.test_suite
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
            'test': self.test
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
            'test': self.test,
            'startDate': self.start_date,
            'finishDate': self.finish_date
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
            'actualResult': self.actual_result,
            'comments': self.comments,
            'isPass': self.is_pass,
            'testStep': self.test_step,
            'testSession': self.test_session
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
            'date': self.date,
            'testSuite': self.test_suite
        }


class TestEventResult(Base):
    __tablename__ = 'test-event-results'
    test_event = Column(Integer, ForeignKey('test-events.id'))
    test_session = Column(Integer, ForeignKey('test-sessions.id'))

    def serialize(self):
        return {
            'id': self.id,
            'test_event': self.test_event,
            'test_session': self.test_session
        }

class Browser(db.Model):
    __tablename__ = 'browsers'

    id = Column(Integer, primary_key=True)
    name = Column(String(128),  nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }

class Server(db.Model):
    __tablename__ = 'servers'

    id = Column(Integer, primary_key=True)
    name = Column(String(128),  nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name
        }
