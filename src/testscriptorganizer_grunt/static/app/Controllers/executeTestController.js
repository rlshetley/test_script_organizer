function executeTestController($scope, testStepService, testResultService, $routeParams, $location) {

    $scope.loadTestSteps = function () {
        testStepService.getByTest({ TestId: $routeParams.testId })
                .$promise.then(
                    function (value) {
                        $scope.testSteps = value;

                        angular.forEach($scope.testSteps, function (testStep, key) {
                            if (testStep.stepNumber == 1) {
                                $scope.testStep = testStep;
                            }
                        });
                    }
                );
    };

    $scope.nextStep = function () {
        var nextStep = $scope.testStep.stepNumber + 1;

        $scope.testResult.testSessionId = $scope.testSessionId;
        $scope.testResult.testStepId = $scope.testStep.id;

        testResultService.save($scope.testResult)
            .$promise.then(
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
                });
    };

    $scope.testSessionId = $routeParams.testSessionId;

    $scope.testSteps;

    $scope.testStep;

    $scope.testResult = {};

    $scope.loadTestSteps();
};

executeTestController['$inject'] = ['$scope', 'testStepService', 'testResultService', '$routeParams', '$location'];