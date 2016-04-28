(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testSuites')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {
        $routeProvider
          .when(
            '/testSuites/:projectId',
            {
                templateUrl: 'app/modules/testSuites/testSuiteList.tmpl.html',
                controller: 'testSuiteController',
                controllerAs: 'vm'
            });
    }
})();
