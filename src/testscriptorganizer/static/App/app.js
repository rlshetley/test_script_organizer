var app = angular.module('app', ['ui.bootstrap', 'ngResource', 'ngRoute', 'ui.sortable', 'ngCookies', 'xeditable']).
  config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
      $routeProvider
          .when(
            '/projects',
            {
                templateUrl: 'static/App/Views/ProjectList.html',
                controller: 'projectController'
            })
          .when(
            '/tests/:testSuiteId',
            {
                templateUrl: 'static/App/Views/TestList.html',
                controller: 'testController'
            })
          .when(
            '/edittest/:testId',
            {
                templateUrl: 'static/App/Views/EditTest.html',
                controller: 'editTestController'
            })
          .when(
            '/addtest/:testId/:testSuiteId',
            {
                templateUrl: 'static/App/Views/EditTest.html',
                controller: 'editTestController'
            })
          .when(
            '/createTestSession/:testId/:testEventId',
            {
                templateUrl: 'static/App/Views/CreateTestSession.html',
                controller: 'createTestSessionController'
            })
          .when(
            '/executeTest/:testSessionId/:testId',
            {
                templateUrl: 'static/App/Views/ExecuteTest.html',
                controller: 'executeTestController'
            })
          .when(
            '/completeTest/:testSessionId',
            {
                templateUrl: 'static/App/Views/CompleteTest.html',
                controller: 'completeTestController'
            })
          .when(
            '/testEvent/:testEventId',
            {
                templateUrl: 'static/App/Views/TestEvent.html',
                controller: 'testEventController'
            })
          .when(
            '/projectTestEvents/:projectId',
            {
                templateUrl: 'static/App/Views/TestEventList.html',
                controller: 'projectTestEventListController'
            })
          .when(
            '/testEvents/:testSuiteid',
            {
                templateUrl: 'static/App/Views/TestEventList.html',
                controller: 'testEventListController'
            })
          .when(
            '/testSuites/:projectId',
            {
                templateUrl: 'static/App/Views/TestSuiteList.html',
                controller: 'testSuiteController'
            })
          .when(
            '/login',
            {
                templateUrl: 'static/App/Views/Login.html',
                controller: 'loginController'
            })
          .when(
            '/admin/user',
            {
                templateUrl: 'static/App/Views/UserAdmin.html',
                controller: 'userAdminController',
                role: 'Admin'
            })
          .when(
            '/profile/user',
            {
                templateUrl: 'static/App/Views/Profile.html',
                controller: 'editProfileController'
            })
          .when(
            '/admin/setup',
            {
                templateUrl: 'static/App/Views/Setup.html',
                controller: 'setupController'
            })
          .when(
            '/error/unauthorized',
            {
                templateUrl: 'static/App/Views/Unauthorized.html',
                controller: 'errorController'
            })
          .when('/logout',
            {
                templateUrl: 'static/App/Views/Logout.html',
                controller: 'logoutController'
            })
          .otherwise({ redirectTo: '/login' });
  }]);

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
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

app.run(['$rootScope', 'userService', '$location', function ($rootScope, userService, $location, $log){

    // Set the logger on the root scope so every controller
    // can use it without having to inject it every time
    $rootScope.$log = $log;

    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
        // Need to check if install is already complete
        //if ($location.path() != "/admin/setup" && !userService.isLogged)
        //{
        //    $location.path('/projects');
        //}

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
