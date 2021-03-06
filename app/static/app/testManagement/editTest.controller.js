﻿(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testManagement')
        .controller('editTestController', editTestController);

    editTestController.$inject = [
        'testService',
        'testStepService',
        '$modal',
        '$stateParams',
        'notifyService'
    ];

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

    function editTestController(
        testService,
        testStepService,
        $modal,
        $stateParams,
        notifyService) {
        /* jshint validthis: true */
        var vm = this;

        vm.addTestStep = _addTestStep;

        vm.editTestStep = _editTestStep;

        vm.removeTestStep = _removeTestStep;

        vm.save = _save;

        vm.testSteps = [];

        vm.sortableOptions = {
            stop: function (e, ui) {

                _.each(vm.testSteps, function (testStep, key) {
                    if (testStep.stepNumber !== key + 1) {
                        testStep.stepNumber = key + 1;
                        testStepService.update(testStep);
                    }
                });
            }
        };

        _init();

        function _init() {
            if (!$stateParams.testId || $stateParams.testId < 1) {
                _createTest($stateParams.testSuiteId);
            }
            else if ($stateParams.testId && $stateParams.testId > 0) {
                _getTest($stateParams.testId);
            }
            else {
                console.log('Missing test information - unable to load test');
            }
        }

        function _buildModalInstance(testStep, title) {
            return $modal.open({
                templateUrl: 'app/views/TestStepModalDialog.html',
                controller: modalTestStepController,
                resolve: {
                    testStep: function () {
                        return testStep;
                    },
                    title: function () {
                        return title;
                    }
                }
            });
        }

        function _loadTestSteps() {
            testService.testSteps.query({ test: vm.test.id }).$promise
                .then(
                    function (value) {
                        vm.testSteps = value.testSteps;
                    }
                )
                .catch(
                    function (e) {
                        notifyService.onError('Unable to load test steps', e);
                    }
                );
        }

        function _createTest(testSuiteId) {
            testService.tests.save({ id: 0, name: 'Test 0', testsuite: testSuiteId }).$promise
                .then(
                    function (value) {
                        vm.test = value;

                        notifyService.onSuccess('Test successfully created');
                    }
                )
                .catch(
                    function (e) {
                        console.error(e);
                    }
                );
        }

        function _getTest(testId) {
            testService.tests.get({ id: testId }).$promise
                .then(
                    function (value) {
                        vm.test = value;

                        _loadTestSteps();
                    }
                )
                .catch(
                    function (e) {
                        notifyService.onError('Unable to load test', e);
                    }
                );
        }

        function _addTestStep() {
            var newTestStep = {
                id: 0,
                name: '',
                action: '',
                expectedResult: '',
                description: '',
                test: vm.test.id
            };

            var modalInstance = _buildModalInstance(newTestStep, 'Add Test Step');

            modalInstance.result.then(function (testStep) {
                var highestValue = 1;

                _.each(vm.testSteps, function (item, key) {
                    if (item.stepNumber >= highestValue) {
                        highestValue = item.stepNumber + 1;
                    }
                });

                testStep.stepNumber = highestValue;

                testService.testSteps.save(testStep).$promise
                    .then(
                        function (data) {
                            vm.testSteps.push(data);

                            notifyService.onSuccess('Test step successfully saved');
                        }
                    )
                    .catch(
                        function (e) {
                            notifyService.onError('Unable to add test', e);
                        }
                    );
            },
            function () {
                vm.loadTestSteps();
            });
        }

        function _editTestStep(id) {
            testService.testSteps.get({ id: id }).$promise
                .then(
                    function (value) {
                        var modalInstance = _buildModalInstance(value, 'Edit Test Step');

                        modalInstance.result.then(function (testStep) {
                            testService.testSteps.update(testStep)
                                .then(
                                    function () {
                                        notifyService.onSuccess('Test step successfully updated');
                                    }
                                )
                                .catch(
                                    function (e) {
                                        notifyService.onError('Unable to update test step', e);
                                    }
                                );
                        });
                    }
                )
                .catch(
                    function (e) {
                        notifyService.onError('Unable to load test step', e);
                    }
                );
        }

        function _removeTestStep(id) {
            testService.testSteps.remove({ id: id }).$promise
                .then(
                    function () {
                        notifyService.onSuccess('Test step successfully removed');
                    }
                )
                .catch(
                    function (e) {
                        notifyService.onError('Unable to delete test step', e);
                    }
                );
        }

        function _save() {
            testService.testSteps.update({ id: vm.test.id }).$promise
                .then(
                    function () {
                        notifyService.onSuccess('Test successfully updated');
                    }
                )
                .catch(
                    function (e) {
                        notifyService.onError('Unable to save test', e);
                    }
                );
        }
    }
})();
