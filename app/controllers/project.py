
from flask import make_response, request
from flask_restful import Resource
from app import db
from app.models import Project

class ProjectController(Resource):
    def get(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()
        return make_response(project, 200)

    def put(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        project.name = request.data['name']

        return make_response(project, 201)

    def delete(self, project_id):
        project = Project.query.filter(Project.id == project_id).first()

        db.session.delete(project)
        db.session.comiit()

        return make_response('', 204)


class ProjectListController(Resource):
    def get(self):
        return make_response(Project.query.all(), 200)

    def post(self):
        project = Project()

        project.name = request.data['name']

        db.session.add(project)
        db.session.commit()

        return make_response(project, 201)
