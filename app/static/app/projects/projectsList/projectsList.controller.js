(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .controller('projectsListController', projectsListController);

    projectsListController.$inject = ['projectService', '$state'];

    function projectsListController(projectService, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.displayProjects = [];

        vm.removeProject = function (project) {

        };

        vm.editProject = function (project) {
            $state.go('EditProject', { project: project });
        };

        vm.createProject = function () {
            $state.go('EditProject', {});
        };
    }
})();
