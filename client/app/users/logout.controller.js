(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.users')
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
