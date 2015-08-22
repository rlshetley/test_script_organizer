(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', loginController);

    loginController.$inject = ['userService', '$location'];

    function loginController(userService, $location){
        var vm = this;
        
        vm.login = _login;

        vm.userName;

        vm.password;

        vm.failedLogin = false;

        _checkLogin();

        function _checkLogin(){
            if (userService.checkLogin()) {
                $location.path('/projects');
            }
        }
        
        function _login(){
            userService.login(vm.userName, vm.password)
                .then(
                    function (data) {
                        userService.userName = vm.userName;
                        $location.path('/projects');
                    }
                )
                .catch(
                    function(data){
                        vm.failedLogin = true;
                    }
                );
        }
    };
})();
