angular.module('TestSuiteModule', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when(
            '/testSuites/:projectId',
            {
                templateUrl: 'app/modules/testSuites/testSuiteList.tmpl.html',
                controller: 'testSuiteController',
                controllerAs: 'vm'
            });
    }]);