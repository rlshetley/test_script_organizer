(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testSessions')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {
        $routeProvider
          .when(
            '/createTestSession/:testId/:testEventId',
            {
                templateUrl: 'app/modules/testSessions/createTestSession.html',
                controller: 'createTestSessionController',
                controllerAs: 'vm'
            });
    }
})();
