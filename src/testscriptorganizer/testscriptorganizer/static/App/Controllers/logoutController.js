function logoutController($scope, userService, $location) {
    userService.logout();

    $location.path('/login');
}