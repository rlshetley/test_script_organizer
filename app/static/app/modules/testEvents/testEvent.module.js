angular.module('TestEventModule', [])
    .config(['$routeProvider', function ($routeProvider) {
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
    }]);