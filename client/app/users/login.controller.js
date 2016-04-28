(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.users')
        .controller('loginController', loginController);

    loginController.$inject = ['userService', '$location'];

    function loginController(userService, $location){
        /* jshint validthis: true */
        var vm = this;

        vm.login = _login;

        vm.userName = '';

        vm.password = '';

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
                        $location.path('/projects');
                    }
                )
                .catch(
                    function(data){
                        vm.failedLogin = true;
                    }
                );
        }
    }
})();
