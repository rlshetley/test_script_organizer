(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {      
          $routeProvider
            .when(
              '/projects',
              {
                  templateUrl: 'app/modules/projects/projectList.tmpl.html',
                  controller: 'projectController',
                  controllerAs: 'vm'
              });
    }
})();
