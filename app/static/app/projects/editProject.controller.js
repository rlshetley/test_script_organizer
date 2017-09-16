(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .controller('editProjectController', editProjectController);

    editProjectController.$inject = ['projectService', '$toastr', '$stateParams'];

    function editProjectController(projectService, $toastr, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.project = {};
        var projectSaveFunction = projectService.projects.save;

        if ($stateParams.project !== null) {
            vm.project = $stateParams.project;
            projectSaveFunction = projectService.projects.update;
        }

        vm.save = function () {
            projectSaveFunction(vm.project).$promise
                .then(function () {
                    $toastr.success('Project saved');
                })
                .catch(function (e) {
                    $toastr.error('Unable to save project');
                });
        };
    }
})();