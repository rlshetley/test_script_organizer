

tsoApp.run(['$rootScope', 'userService', '$location', function ($rootScope, userService, $location)
{
    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
        // Need to check if install is already complete
        //if ($location.path() != "/admin/setup" && !userService.isLogged)
        //{
        //    $location.path('/projects');
        //}

        // Need to check the roles for the user
        // Only check the role if there 
        // are actually roles to check
        if (next.$$route.role) {
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

