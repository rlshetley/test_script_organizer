(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.security')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider'];

    function configureRoutes($stateProvider) {

        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'app/security/login.html',
                controller: 'loginController',
                controllerAs: 'vm'
            });
    }
})();