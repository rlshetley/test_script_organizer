from flask.ext.httpauth import HTTPBasicAuth

from app import db, auth
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean

from passlib.hash import sha256_crypt

users_roles = db.Table(
    'users_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'))
)

class User(db.Model):
    id = Column(Integer, primary_key=True)
    user_name = Column(String(225),  nullable=False)
    password = Column(String(225),  nullable=False)

    roles = db.relationship(
        'Role',
        secondary=users_roles,
        backref=db.backref('users', lazy='dynamic')
    )

    def set_password(self, password):
        self.password = sha256_crypt.encrypt(password)
        return

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'roles': i.serialize() for i in self.roles
        }

@auth.verify_password
def verify_password(username, password):
    user = User.query.filter(User.user_name == username).first()

    if not user:
        return False

    return sha256_crypt.verify(password, user.password)
