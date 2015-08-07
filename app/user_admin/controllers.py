
from flask import make_response, request
from flask.json import jsonify
from flask.views import MethodView
from app import db, register_controller
from app.user_admin.models import User

class UserController(MethodView):
    def get(self, user_id):
        user = User.query.filter(User.id == user_id).first()

        resp = jsonify(user.serialize())
        resp.status_code = 200

        return resp

    def put(self, user_id):
        user = User.query.filter(User.id == user_id).first()

        user.username = request.data['username']

        resp = jsonify(user.serialize())
        resp.status_code = 201

        return resp

    def delete(self, user_id):
        user = User.query.filter(User.id == user_id).first()

        db.session.delete(user)
        db.session.comiit()

        return make_response('', 204)


class UserListController(MethodView):
    def get(self):
        results = []

        if 'username' in request.args:
            uername = request.args.get('username')

            # There should only be on user so do a first query
            user = User.query.filter(User.username == username).first()

            resp = jsonify(user.serialize())
            resp.status_code = 201

            return resp
        else:
            results = User.query.all()

         resp = jsonify(json_list=[i.serialize() for i in results])
         resp.status_code = 200
         return resp

    def post(self):
        user = User()

        user.username = request.data['username']

        user.set_password(request.data['password'])

        db.session.add(user)
        db.session.commit()

        resp = jsonify(user.serialize())
        resp.status_code = 201

        return resp

register_controller(UserController, 'user_api', '/users/<int:user_id>')
register_controller(UserListController, 'user_list_api', '/users/', ['GET', 'POST'])
