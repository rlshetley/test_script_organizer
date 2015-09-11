var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute', 'ui.sortable', 'ngCookies', 'xeditable']).
  config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
      $routeProvider
          .when(
            '/projects',
            {
                templateUrl: 'app/views/ProjectList.html',
                controller: 'projectController',
                controllerAs: 'vm'
            })
          .when(
            '/tests/:testSuiteId',
            {
                templateUrl: 'app/views/TestList.html',
                controller: 'testController',
                controllerAs: 'vm'
            })
          .when(
            '/edittest/:testId',
            {
                templateUrl: 'app/views/EditTest.html',
                controller: 'editTestController',
                controllerAs: 'vm'
            })
          .when(
            '/addtest/:testId/:testSuiteId',
            {
                templateUrl: 'app/views/EditTest.html',
                controller: 'editTestController',
                controllerAs: 'vm'
            })
          .when(
            '/createTestSession/:testId/:testEventId',
            {
                templateUrl: 'app/views/CreateTestSession.html',
                controller: 'createTestSessionController',
                controllerAs: 'vm'
            })
          .when(
            '/executeTest/:testSessionId/:testId',
            {
                templateUrl: 'app/views/ExecuteTest.html',
                controller: 'executeTestController',
                controllerAs: 'vm'
            })
          .when(
            '/completeTest/:testSessionId',
            {
                templateUrl: 'app/views/CompleteTest.html',
                controller: 'completeTestController',
                controllerAs: 'vm'
            })
          .when(
            '/testEvent/:testEventId',
            {
                templateUrl: 'app/views/TestEvent.html',
                controller: 'testEventController',
                controllerAs: 'vm'
            })
          .when(
            '/projectTestEvents/:projectId',
            {
                templateUrl: 'app/views/TestEventList.html',
                controller: 'projectTestEventListController',
                controllerAs: 'vm'
            })
          .when(
            '/testEvents/:testSuiteid',
            {
                templateUrl: 'app/views/TestEventList.html',
                controller: 'testEventListController',
                controllerAs: 'vm'
            })
          .when(
            '/testSuites/:projectId',
            {
                templateUrl: 'app/views/TestSuiteList.html',
                controller: 'testSuiteController',
                controllerAs: 'vm'
            })
          .when(
            '/login',
            {
                templateUrl: 'app/views/Login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
          .when(
            '/admin/user',
            {
                templateUrl: 'app/views/UserAdmin.html',
                controller: 'userAdminController',
                controllerAs: 'vm',
                role: 'Admin'
            })
          .when(
            '/profile/user',
            {
                templateUrl: 'app/views/Profile.html',
                controller: 'editProfileController',
                controllerAs: 'vm'
            })
          .when(
            '/admin/setup',
            {
                templateUrl: 'app/views/Setup.html',
                controller: 'setupController',
                controllerAs: 'vm'
            })
          .when(
            '/error/unauthorized',
            {
                templateUrl: 'app/views/Unauthorized.html',
                controller: 'errorController',
                controllerAs: 'vm'
            })
          .when('/logout',
            {
                templateUrl: 'app/views/logout.html',
                controller: 'logoutController',
                controllerAs: 'vm'
            })
          .otherwise({ redirectTo: '/login' });
  }]);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

app.config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.constant('$appConfig',
{
    APP_NAME: 'TEST SCRIPT ORGANIZER',
    APP_VERSION: '1.0.0',
    API: 'http://127.0.0.1:8000/'
});

app.run(['$rootScope', 'userService', '$location', '$log', function ($rootScope, userService, $location, $log){

    // Set the logger on the root scope so every controller
    // can use it without having to inject it every time
    $rootScope.$log = $log;

    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
        if (!userService.checkLogin()){
            $location.path('/login');
        }
        else{
            $rootScope.$broadcast('loggedIn', true);
        }

        // Need to check the roles for the user
        // Only check the role if there
        // are actually roles to check
        if (next.$$route && next.$$route.role) {
            var role = next.$$route.role;

            // Only check the role if there
            // are actually roles to check
            if (role) {
                if (!userService.isInRole(role)) {
                    $location.path('/unauthorized');
                }
            }
        }
    });

}]);
