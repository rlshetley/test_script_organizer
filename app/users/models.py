from flask.ext.httpauth import HTTPBasicAuth
from flask import g
from app import db, auth, app
from sqlalchemy import Column, Integer, ForeignKey, String, DateTime, Boolean

from itsdangerous import (TimedJSONWebSignatureSerializer as Serializer, BadSignature, SignatureExpired)

from passlib.hash import sha256_crypt

users_roles = db.Table(
    'users_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'))
)

class User(db.Model):
    __tablename__ = 'user'
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

    def verify_password(self, password):
        return sha256_crypt.verify(password, self.password)

    def serialize(self):
        return {
            'id': self.id,
            'username': self.user_name,
            'roles': [i.serialize() for i in self.roles]
        }


    def generate_auth_token(self, expiration = 600):
        """
        Generates an authorization token for the user

        Args:
            expiration (int): The time in seconds to expire the token

        Returns:
            A generated token
        """
        s = Serializer(app.config['SECRET_KEY'], expires_in = expiration)
        return s.dumps({ 'id': self.id })

    @staticmethod
    def verify_auth_token(token):
        """
        Verifies that that the token is valid

        Args:
            token (str): The token to authorize

        Returns:
            A user if valid else None

        """
        s = Serializer(app.config['SECRET_KEY'])
        try:
            data = s.loads(token)
        except SignatureExpired:
            return None # valid token, but expired
        except BadSignature:
            return None # invalid token
        user = User.query.get(data['id'])
        return user

@auth.verify_password
def verify_password(username_or_token, password):
    """
    If the first parameter is a token verifies the token
    Else if the first parameter is a user name then verifies the username/password

    Args:
        username_or_token (str): A user name or token value
        password (str): A password

    Returns:
        True if valid else false
    """
    user = User.verify_auth_token(username_or_token)

    if not user:
        user = User.query.filter(User.user_name == username_or_token).first()

        if not user or not user.verify_password(password=password):
            return False

        verified = sha256_crypt.verify(password, user.password)

    g.user = user
    return True
