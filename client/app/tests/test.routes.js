(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.tests')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {
        $routeProvider
          .when(
            '/tests/:testSuiteId',
            {
                templateUrl: 'app/modules/tests/testList.tmpl.html',
                controller: 'testController',
                controllerAs: 'vm'
            })
          .when(
            '/edittest/:testId',
            {
                templateUrl: 'app/modules/tests/editTest.tmpl.html',
                controller: 'editTestController',
                controllerAs: 'vm'
            })
          .when(
            '/addtest/:testId/:testSuiteId',
            {
                templateUrl: 'app/modules/tests/editTest.tmpl.html',
                controller: 'editTestController',
                controllerAs: 'vm'
            })
          .when(
            '/executeTest/:testSessionId/:testId',
            {
                templateUrl: 'app/modules/tests/executeTest.tmpl.html',
                controller: 'executeTestController',
                controllerAs: 'vm'
            })
          .when(
            '/completeTest/:testSessionId',
            {
                templateUrl: 'app/modules/tests/completeTest.tmpl.html',
                controller: 'completeTestController',
                controllerAs: 'vm'
            });
    })();
