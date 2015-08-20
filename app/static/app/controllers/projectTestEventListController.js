(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectTestEventListController', projectTestEventListController);

    projectTestEventListController.$inject = ['$scope', 'testEventService', '$routeParams'];

    function projectTestEventListController($scope, testEventService, $routeParams){
        function init(){
            testEventService.query({ projectId: $scope.projectId }).$promise
                .then(
                    function (data){
                        $scope.testEvents = data.test_events;
                    }
                );
        }

        $scope.remove = function (id){
            testEventService.remove({ id: id });
        };

        $scope.testEvents;

        $scope.projectId = $routeParams.projectId;

        init();
    };
})();
