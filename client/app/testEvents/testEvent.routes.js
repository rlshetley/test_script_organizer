(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEvents')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {
        $routeProvider
          .when(
            '/projectTestEvents/:projectId',
            {
                templateUrl: 'app/modules/testEvents/testEventList.tmpl.html',
                controller: 'projectTestEventListController',
                controllerAs: 'vm'
            })
          .when(
            '/testEvents/:testSuiteid',
            {
                templateUrl: 'app/modules/testEvents/testEventList.tmpl.html',
                controller: 'testEventListController',
                controllerAs: 'vm'
            })
          .when(
            '/testEvent/:testEventId',
            {
                templateUrl: 'app/modules/testEvents/testEvent.html',
                controller: 'testEventController',
                controllerAs: 'vm'
            });
    }
})();
