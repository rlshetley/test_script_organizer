(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.dashboard')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('MainDashboard', {
                url: '/main_dashboard',
                templateUrl: 'app/dashboard/mainDashboard.html',
                controller: 'mainDashboardController',
                controllerAs: 'vm'
            });
    }
})();
