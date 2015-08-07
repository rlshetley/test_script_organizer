from app import app, db

def before_all(context):
    context.app = app.test_client()
    db.create_all()

def after_all(context):
    db.session.remove()
    db.drop_all()
