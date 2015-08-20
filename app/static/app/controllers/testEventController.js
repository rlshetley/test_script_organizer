(function () {
    'use strict';

    angular
        .module('app')
        .controller('testEventController', testEventController);

    testEventController.$inject = ['$scope', 'testEventService', '$routeParams', '$location'];

    function testEventController($scope, testEventService, $routeParams, $location){
        function init(){
            testEventService.get({ Id: $scope.testEventId }).$promise
                .then(
                    function (data){
                        $scope.testEvent = data;
                    }
                );
        }

        $scope.startTest = function (testId){
            $location.path('/createTestSession/' + testId + '/' + $scope.testEventId);
        };

        $scope.testEvent;

        $scope.testEventId = $routeParams.testEventId;

        init();
    };
})();
