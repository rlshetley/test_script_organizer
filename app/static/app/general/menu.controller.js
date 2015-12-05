(function () {
    'use strict';

    angular
        .module('app')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'userService', 'notifyService', '$location'];

    function menuController($scope, userService, notifyService, $location){
        /* jshint validthis: true */
        var vm = this;

        vm.name = userService.getUser().name;

        vm.loggedIn = userService.isLoggedIn();

        vm.alerts = notifyService.alerts;

        $scope.$on('loggedIn', function (event, value){
            vm.loggedIn = value;
        });
    }
})();
