(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('Projects', {
                url: '/projects',
                templateUrl: 'app/projects/projects.html',
                controller: 'projectsController',
                controllerAs: 'vm'
            })
            .state('EditProject', {
                url: '/editProject',
                templateUrl: 'app/projects/editProject.html',
                controller: 'editProjectController',
                controllerAs: 'vm',
                params: { project: null }
            })
            .state('TestSuites', {
                url: '/testSuites/:projectId',
                templateUrl: 'app/projects/testSuitesList.html',
                controller: 'testSuitesListController',
                controllerAs: 'vm'
            });
    }
})();
