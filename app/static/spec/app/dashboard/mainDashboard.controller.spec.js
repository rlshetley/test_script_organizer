'use strict';

describe('controller: mainDashboardController', function () {
    var controller;
    var scope;
    var projectService;
    var q;
    var deferred;
    var projects = [{ id: 2 }, { id: 15 }];

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope, $q, _projectService_) {
        scope = $rootScope.$new();

        q = $q;

        projectService = _projectService_;

        deferred = q.defer();
        spyOn(projectService.projects, 'query').and.returnValue({ $promise: deferred.promise });

        controller = $controller('mainDashboardController', { $scope: scope });
    }));

    it('should load projects', function () {

        deferred.resolve({ projects: projects });

        scope.$digest();

        expect(controller.projects.length).toEqual(2);
    });
});
