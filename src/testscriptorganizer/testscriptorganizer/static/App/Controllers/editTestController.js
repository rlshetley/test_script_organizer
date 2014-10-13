﻿function editTestController($scope, testService, testStepService, $modal, $routeParams) {
    $scope.loadTest = function () {
        if ($routeParams.testId == 0) {
            testService.save({ id: 0, name: 'Test 0', testSuite: $routeParams.testSuiteId })
                .$promise.then(
                    function (value) {
                        $scope.test = value;
                    }
                );
        }
        else {
            testService.get({ Id: $routeParams.testId })
                .$promise.then(
                    function (value) {
                        $scope.test = value;

                        $scope.loadTestSteps();
                    }
                );
        }
    };

    $scope.loadTestSteps = function () {
        testStepService.getByTest({ TestId: $scope.test.id })
                .$promise.then(
                    function (value) {
                        $scope.testSteps = value;
                    }
                );
    };

    $scope.addTestStep = function () {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/TestStepModalDialog.html',
            controller: modalTestStepController,
            resolve:
            {
                testStep: function () {
                    return {
                        Id: 0,
                        Name: '',
                        Action: '',
                        ExpectedResult: '',
                        Description: '',
                        TestId: $scope.test.id
                    };
                },
                title: function ()
                {
                    return "Add Test Step";
                }
            }
        });

        modalInstance.result.then(function (testStep)
        {
            var highestValue = 1;

            angular.forEach($scope.testSteps, function (item, key)
            {
                if (item.stepNumber >= highestValue)
                {
                    highestValue = item.stepNumber + 1;
                }
            });

            testStep.stepNumber = highestValue;

            testStepService.save(testStep)
                .$promise.then(function (data)
                {
                    $scope.testSteps.push(testStep);
                });
        },
        function () {
            $scope.loadTestSteps();
        });
    };

    $scope.editTestStep = function (id) {
        testStepService.get({ id: id })
            .$promise
            .then(
                function (value) {
                    var modalInstance = $modal.open({
                        templateUrl: 'App/Views/TestStepModalDialog.html',
                        controller: modalTestStepController,
                        resolve:
                        {
                            testStep: function () {
                                return editTestStep;
                            },
                            title: function ()
                            {
                                return "Edit Test Step";
                            }
                        }
                    });

                    modalInstance.result.then(function (testStep)
                    {
                        testStepService.update(testStep);
                    },
                    function ()
                    {
                    });
                });
    };

    $scope.removeTestStep = function (id) {
        testStepService.remove({ id: id });
    };

    $scope.save = function () {
        testService.update($scope.test);
    };

    $scope.sortableOptions = {
        stop: function (e, ui) {

            angular.forEach($scope.testSteps, function (testStep, key) {
                if (testStep.stepNumber != key + 1) {
                    testStep.stepNumber = key + 1;
                    testStepService.update(testStep);
                }
            });
        }
    };

    $scope.loadTest();
};

editTestController['$inject'] = ['$scope', 'testService', 'testStepService', '$modal', '$routeParams'];

var modalTestStepController = function ($scope, $modalInstance, testStep, title) {
    $scope.testStep = testStep;

    $scope.title = title;

    $scope.ok = function () {
        $modalInstance.close($scope.testStep);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};
