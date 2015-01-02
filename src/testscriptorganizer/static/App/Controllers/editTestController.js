﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('editTestController', editTestController);

    editTestController.$inject = ['$scope', 'testService', 'testStepService', '$modal', '$routeParams'];

    function editTestController($scope, testService, testStepService, $modal, $routeParams) {
        var thisController = this;

        thisController.buildModalInstance = function(testStep, title){
            $modal.open({
                templateUrl: 'static/App/Views/TestStepModalDialog.html',
                controller: modalTestStepController,
                resolve:{
                    testStep: function () {
                        return testStep;
                    },
                    title: function (){
                        return title;
                    }
                }
            });
        };

        thisController.loadTestSteps = function () {
            testStepService.getByTest({ testId: $scope.test.id }).$promise
                .then(
                    function (value) {
                        $scope.testSteps = value;
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        thisController.createTest = function(testSuiteId){
            testService.save({ id: 0, name: 'Test 0', testSuite: testSuiteId }).$promise
                .then(
                    function (value) {
                        $scope.test = value;
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        thisController.getTest = function(testId){
            testService.get({ id: testId}).$promise
                .then(
                    function (value) {
                        $scope.test = value;

                        thisController.loadTestSteps();
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        this.init = function () {
            if (!$routeParams.testId || $routeParams.testId === 0) {
                thisController.createTest($routeParams.testSuiteId);
            }
            else if ($routeParams.testId && $routeParams.testId > 0) {
                thisController.getTest($routeParams.testId);
            }
            else {
                // TODO developing mechanism for showing errors
            }
        };

        $scope.addTestStep = function () {
            var newTestStep = {
                id: 0,
                name: '',
                action: '',
                expectedResult: '',
                description: '',
                test: $scope.test.id
            };

            var modalInstance = thisController.buildModalInstance(newTestStep, "Add Test Step")

            modalInstance.result.then(function (testStep){
                var highestValue = 1;

                angular.forEach($scope.testSteps, function (item, key){
                    if (item.stepNumber >= highestValue){
                        highestValue = item.stepNumber + 1;
                    }
                });

                testStep.stepNumber = highestValue;

                testStepService.save(testStep).$promise
                    .then(
                        function (data){
                            $scope.testSteps.push(data);
                        }
                    );
            },
            function () {
                thisController.loadTestSteps();
            });
        };

        $scope.editTestStep = function (id) {
            testStepService.get({ id: id }).$promise
                .then(
                    function (value) {
                        var modalInstance = this.buildModalInstance(value, "Edit Test Step");

                        modalInstance.result.then(function (testStep){
                            testStepService.update(testStep);
                        });
                    }
                );
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

        this.init();
    };

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
})();
