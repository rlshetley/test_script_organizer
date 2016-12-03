(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .directive('projectsList', projectsList);

    projectsList.$inject = [];

    function projectsList() {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
                projects: '='
            },
            templateUrl: 'app/projects/projectsList/projectsList.html',
            controller: 'projectsListController',
            controllerAs: 'projectsListCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }

})();