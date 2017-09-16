(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .controller('testSuitesListController', testSuitesListController);

    testSuitesListController.$inject = ['projectService', '$stateParams'];

    function testSuitesListController(projectService, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.project = {};

        vm.testSuites = [];

        vm.displayTestSuites = [];

        vm.editTestSuite = function (testSuite) {

        };

        vm.removeTestSuite = function (testSuite) {

        };

        vm.startTestEvent = function (testSuite) {

        };

        vm.createTestSuite = function () {

        };

        _init();

        function _init() {
            projectService.testSuites.query({ project: $stateParams.projectId }).$promise
                .then(function (data) {
                    vm.testSuites = data.testSuites;
                });

            projectService.projects.get({ projectId: $stateParams.projectId }).$promise
                .then(function (data) {
                    vm.project = data;
                });
        }
    }
}());