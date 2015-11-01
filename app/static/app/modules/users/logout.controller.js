(function () {
    'use strict';

    angular
        .module('app')
        .controller('logoutController', logoutController);

    logoutController.$inject = ['userService', '$location'];

    function logoutController(userService, $location) {

        try {
            userService.logout();

            $location.path('/login');
        }
        catch(e){
            console.error(e);
        }
    }
})();
