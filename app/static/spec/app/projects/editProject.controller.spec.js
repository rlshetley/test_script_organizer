'use strict';

describe('controller: editProjectController', function () {
    var controller;
    var scope;
    var stateParams;
    var projectService;
    var q;
    var controllerService;
    var toastr;

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope, $stateParams, $q, $toastr, _projectService_) {
        scope = $rootScope.$new();

        q = $q;

        stateParams = $stateParams;

        controllerService = $controller;

        projectService = _projectService_;

        toastr = $toastr;
    }));

    it('should save a new project when no project is selected', function () {
        var project = { id: 10 };
        var deferred = q.defer();

        stateParams.project = null;

        spyOn(toastr, 'success');

        spyOn(projectService.projects, 'save').and.returnValue({ $promise: deferred.promise });

        controller = controllerService('editProjectController', {});

        controller.project = project;

        controller.save();

        deferred.resolve({});

        scope.$digest();

        expect(projectService.projects.save).toHaveBeenCalledWith(project);

        expect(toastr.success).toHaveBeenCalled();
    });

    it('should update a project when a project is provided', function () {
        var project = { id: 10 };

        stateParams.project = project;

        spyOn(toastr, 'success');

        var deferred = q.defer();

        spyOn(projectService.projects, 'update').and.returnValue({ $promise: deferred.promise });

        controller = controllerService('editProjectController', { $stateParams: stateParams });

        controller.save();

        deferred.resolve({});

        scope.$digest();

        expect(projectService.projects.update).toHaveBeenCalledWith(project);

        expect(toastr.success).toHaveBeenCalled();
    });
});