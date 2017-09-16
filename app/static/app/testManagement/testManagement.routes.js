(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testManagement')
        .config(configureRoutes);

    configureRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];

    function configureRoutes($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('TestList', {
                url: '/tests/:testSuiteId',
                templateUrl: 'app/testManagement/testList.html',
                controller: 'testListController',
                controllerAs: 'vm'
            });
    }
})();
