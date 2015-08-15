(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['$scope', 'userService', '$location'];

    function loginController($scope, userService, $location){
        $scope.login = function (){
            userService.login($scope.userName, $scope.password)
                .then(
                    function (data) {
                        userService.userName = $scope.userName;
                        $location.path('/projects');
                    }
                )
                .catch(
                    function(data){
                        $scope.failedLogin = true;
                    }
                );
        }

        $scope.checkLogin = function (){
            if (userService.checkLogin()) {
                $location.path('/projects');
            }
        }

        $scope.userName;

        $scope.password;

        $scope.failedLogin = false;

        $scope.checkLogin();
    };
})();
