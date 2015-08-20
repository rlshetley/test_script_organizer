(function () {
    'use strict';

    angular
        .module('app')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'userService', 'notifyService', '$location'];

    function menuController($scope, userService, notifyService, $location){
        $scope.name = userService.name;

        $scope.loggedIn = userService.isLogged;

        $scope.alerts = notifyService.alerts;

        $scope.$on('loggedIn', function (event, value){
            $scope.loggedIn = value;
        });

        $scope.logout = function () {
            userService.logout();

            $location.path('/login');
        };
    };
})();
