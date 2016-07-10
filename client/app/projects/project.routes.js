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
            });
    }
})();
