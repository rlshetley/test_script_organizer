
from flask import make_response, request
from flask.views import MethodView
from flask.json import jsonify
from app import db, register_controller
from app.core.models import Project
import json


class ProjectController(MethodView):
    def get(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        if project is None:
            return make_response('', 404)

        resp = jsonify(project.serialize())
        resp.status_code = 200

        return resp

    def put(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        project.name = request.json_data['name']

        resp = jsonify(project.serialize())
        resp.status_code = 201

        return resp

    def delete(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        db.session.delete(project)
        db.session.commit()

        return make_response('', 204)


class ProjectListController(MethodView):
    def get(self):
        results = [i.serialize() for i in Project.query.all()]
        resp = jsonify(projects=results)
        resp.status_code = 200
        return resp

    def post(self):
        project = Project()

        project.name = request.json_data['name']

        db.session.add(project)
        db.session.commit()

        resp = jsonify(project.serialize())
        resp.status_code = 201

        return resp

register_controller(ProjectController, 'project_api', '/projects/<int:project_id>/')
register_controller(ProjectListController, 'project_list_api', '/projects/', ['GET', 'POST'])
