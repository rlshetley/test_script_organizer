(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider) {

        // Set up our default state
        $urlRouterProvider.otherwise('login');

        $urlRouterProvider.when('', '/login');

        $stateProvider
            .state('Error', {
                url: '/error/unauthorized',
                templateUrl: 'app/general/Unauthorized.html',
                controller: 'errorController',
                controllerAs: 'vm'
            });
    }
})();
