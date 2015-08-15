from app import app, db
from app.core.models import *


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
