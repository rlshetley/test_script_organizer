function menuController($scope, userService)
{
    $scope.name = "Ray Shetley";

    $scope.loggedIn = userService.isLogged;

    $scope.$on('loggedIn', function (event, value)
    {
        $scope.loggedIn = value;
    });

    $scope.logout = function () {
        userService.logout();

        $location.path('/login');
    };
}