(function () {
    'use strict';

    angular
        .module('app')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'userService', 'alertService'];

    function menuController($scope, userService, alertService){
        $scope.name = userService.name;

        $scope.loggedIn = userService.isLogged;

        $scope.alerts = alertService.alerts;

        $scope.$on('loggedIn', function (event, value){
            $scope.loggedIn = value;
        });

        $scope.logout = function () {
            userService.logout();

            $location.path('/login');
        };
    };
})();
