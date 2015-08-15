(function () {
    'use strict';

    angular
        .module('app')
        .controller('logoutController', logoutController);

    logoutController.$inject = ['$scope', 'userService', '$location'];

    function logoutController($scope, userService, $location) {

        try {
            userService.logout();

            $location.path('/login');
        }
        catch(e){
            $scope.$log.error(e);
        }
    }
})();
