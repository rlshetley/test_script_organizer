(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .directive('activeTestSessions', activeTestSessions);

    activeTestSessions.$inject = [];

    function activeTestSessions() {
        return {
            restrict: 'E',
            scope: true,
            bindToController: {
            },
            templateUrl: 'app/testSession/activeTestSessions/activeTestSessions.html',
            controller: 'activeTestSessionsController',
            controllerAs: 'activeTestSessionsCtrl',
            link: function (scope, element, attrs) {
            }
        };
    }

})();