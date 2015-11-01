angular.module('ProjectModule', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
          .when(
            '/projects',
            {
                templateUrl: 'app/modules/projects/projectList.tmpl.html',
                controller: 'projectController',
                controllerAs: 'vm'
            });
    }]);