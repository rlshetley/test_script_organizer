(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.security')
        .controller('loginController', loginController);

    loginController.$inject = ['userService', '$state'];

    function loginController(userService, $state){
        /* jshint validthis: true */
        var vm = this;

        vm.login = _login;

        vm.userName = '';

        vm.password = '';

        vm.failedLogin = false;

        _checkLogin();

        function _checkLogin(){
            if (userService.checkLogin()) {
                $state.go('MainDashboard');
            }
        }

        function _login(){
            userService.login(vm.userName, vm.password)
                .then(
                    function (data) {
                        $state.go('MainDashboard');
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
