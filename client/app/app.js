var app = angular.module('testScriptOrganizer', [
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
    'TestModule']);

app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.run(['$rootScope', 'userService', '$location', '$log', function ($rootScope, userService, $location, $log){

    // Set the logger on the root scope so every controller
    // can use it without having to inject it every time
    $rootScope.$log = $log;

    $rootScope.$on("$routeChangeStart", function (event, next, current){
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
