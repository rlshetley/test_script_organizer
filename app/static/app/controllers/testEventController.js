(function () {
    'use strict';

    angular
        .module('app')
        .controller('testEventController', testEventController);

    testEventController.$inject = ['$scope', 'testEventService', 'testService', '$routeParams', '$location'];

    function testEventController($scope, testEventService, testService, $routeParams, $location){
        function init(){
            testEventService.get({ id: $scope.testEventId }).$promise
                .then(
                    function (data){
                        $scope.testEvent = data;
                        
                        loadTests();
                    }
                );
        }
        
        function loadTests(){
            testService.query({ testsuite: $scope.testEvent.testSuite }).$promise
                .then(
                    function (data) {
                        $scope.tests = data.tests
                    }
                );
        }

        $scope.startTest = function (testId){
            $location.path('/createTestSession/' + testId + '/' + $scope.testEventId);
        };

        $scope.testEvent = {};
        
        $scope.tests = [];

        $scope.testEventId = $routeParams.testEventId;

        init();
    };
})();
