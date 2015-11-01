var app = angular.module('app', [
    'ui.bootstrap', 
    'ngResource', 
    'ngRoute', 
    'ui.sortable', 
    'ngCookies', 
    'xeditable',
    'ProjectModule',
    'TestEventModule',
    'TestSessionModule',
    'TestSuiteModule',
    'UserModule',
    'TestModule']).
  config(['$routeProvider', function ($routeProvider) {
      $routeProvider
          .when(
            '/error/unauthorized',
            {
                templateUrl: 'app/views/Unauthorized.html',
                controller: 'errorController',
                controllerAs: 'vm'
            })
          .when('/dashboard',
            {
                templateUrl: 'app/views/Dashboard.html',
                controller: 'dashboardController',
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
