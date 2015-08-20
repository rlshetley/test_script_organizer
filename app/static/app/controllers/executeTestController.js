(function () {
    'use strict';

    angular
        .module('app')
        .controller('executeTestController', executeTestController);

    executeTestController.$inject = ['$scope', 'testStepService', 'testResultService', '$routeParams', '$location'];

    function executeTestController($scope, testStepService, testResultService, $routeParams, $location) {
        
        function init() {
            testStepService.getByTest({ TestId: $routeParams.testId }).$promise
                .then(
                    function (value) {
                        $scope.testSteps = value;

                        angular.forEach($scope.testSteps, function (testStep, key) {
                            if (testStep.stepNumber == 1) {
                                $scope.testStep = testStep;
                            }
                        });
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        $scope.nextStep = function () {
            var nextStep = $scope.testStep.stepNumber + 1;

            $scope.testResult.testSessionId = $scope.testSessionId;
            $scope.testResult.testStepId = $scope.testStep.id;

            testResultService.save($scope.testResult).$promise
                .then(
                    function (value) {

                        if (nextStep <= $scope.testSteps.length) {
                            angular.forEach($scope.testSteps, function (testStep, key) {
                                if (testStep.stepNumber == nextStep) {
                                    $scope.testStep = testStep;
                                }
                            });

                            $scope.testResult.pass = false;
                            $scope.testResult.actualResult = '';
                            $scope.testResult.comments = '';
                        }
                        else {
                            $location.path('/completeTest/' + $scope.testSessionId);
                        }
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        $scope.testSessionId = $routeParams.testSessionId;

        $scope.testSteps;

        $scope.testStep;

        $scope.testResult = {};

        init();
    };
})();
