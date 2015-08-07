
from flask import make_response, request
from flask.views import MethodView
from flask.json import jsonify
from app import db, register_controller
from app.core.models import Project
import json

class ProjectController(MethodView):
    def get(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        resp = jsonify(project.serialize())
        resp.status_code = 200

        return resp

    def put(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        data = request.get_data(as_text=True)
        request_data = json.loads(data)
        project.name = request_data['name']

        resp = jsonify(project.serialize())
        resp.status_code = 201

        return resp

    def delete(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        db.session.delete(project)
        db.session.comiit()

        return make_response('', 204)


class ProjectListController(MethodView):
    def get(self):
        resp = jsonify(json_list=[i.serialize() for i in Project.query.all()])
        resp.status_code = 200
        return resp

    def post(self):
        project = Project()

        data = request.get_data(as_text=True)
        request_data = json.loads(data)
        project.name = request_data['name']

        db.session.add(project)
        db.session.commit()

        resp = jsonify(project.serialize())
        resp.status_code = 201

        return resp

register_controller(ProjectController, 'project_api', '/projects/<int:project_id>')
register_controller(ProjectListController, 'project_list_api', '/projects/', ['GET', 'POST'])
