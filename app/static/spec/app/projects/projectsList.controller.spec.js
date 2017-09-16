'use strict';

describe('controller: projectsListController', function () {
    var controller;
    var scope;
    var state;

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope, $state) {
        scope = $rootScope.$new();

        state = $state;

        controller = $controller('projectsListController', {});
    }));

    it('should go to edit a project when a project is selected', function () {
        var project = { id: 10 };
        
        spyOn(state, 'go');

        controller.editProject(project);

        expect(state.go).toHaveBeenCalledWith('EditProject', { project: project });
    });

    it('should go to add a project', function () {
        spyOn(state, 'go');

        controller.createProject();

        expect(state.go).toHaveBeenCalledWith('EditProject', {});
    });
});