(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('TestSessionList', {
                url: '/testSessions',
                templateUrl: 'app/testSession/testSessionsList.html',
                controller: 'testSessionsListController',
                controllerAs: 'vm'
            })
            .state('TestEVentList', {
                url: '/testEvents/:projectId',
                templateUrl: 'app/testEventManagement/testEventsList.html',
                controller: 'testEventsListController',
                controllerAs: 'vm'
            });
    }
})();
