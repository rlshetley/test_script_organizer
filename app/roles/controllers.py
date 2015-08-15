
from flask import make_response, request
from flask.views import MethodView
from flask.json import jsonify
from app import db, register_controller
from app.roles.models import Role

class RoleController(MethodView):
    def get(self):
         resp = jsonify(json_list=[i.serialize() for i in Role.query.all()])
         resp.status_code = 200
         return resp

class RoleUsersController(MethodView):
    def get(self, role_id):
        role = Role.query.filter(Role.id == role_id)
        resp = jsonify(json_list=[i.serialize() for i in role.users])
        resp.status_code = 200
        return resp

register_controller(RoleController, 'role_api', '/roles/', ['GET'])

register_controller(RoleUsersController, 'role_users_api', '/roles/<int:role_id>/users', ['GET'])
