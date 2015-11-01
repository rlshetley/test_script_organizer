angular.module('TestSessionModule', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when(
            '/createTestSession/:testId/:testEventId',
            {
                templateUrl: 'app/modules/testSessions/createTestSession.html',
                controller: 'createTestSessionController',
                controllerAs: 'vm'
            });
    }]);