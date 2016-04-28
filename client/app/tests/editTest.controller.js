(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.tests')
        .controller('editTestController', editTestController);

    editTestController.$inject = ['testService', 'testStepService', '$modal', '$routeParams', 'notifyService'];

    function editTestController(testService, testStepService, $modal, $routeParams, notifyService) {
        /* jshint validthis: true */
        var vm = this;

        vm.addTestStep = _addTestStep;

        vm.editTestStep = _editTestStep;

        vm.removeTestStep = _removeTestStep;

        vm.save = _save;

        vm.testSteps = [];

        vm.sortableOptions = {
            stop: function (e, ui) {

                angular.forEach(vm.testSteps, function (testStep, key) {
                    if (testStep.stepNumber != key + 1) {
                        testStep.stepNumber = key + 1;
                        testStepService.update(testStep);
                    }
                });
            }
        };

        _init();

        function _init() {
            if (!$routeParams.testId || $routeParams.testId < 1) {
                _createTest($routeParams.testSuiteId);
            }
            else if ($routeParams.testId && $routeParams.testId > 0) {
                _getTest($routeParams.testId);
            }
            else {
                console.log('Missing test information - unable to load test');
            }
        }

        function _buildModalInstance(testStep, title){
            return $modal.open({
                templateUrl: 'app/views/TestStepModalDialog.html',
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
        }

        function _loadTestSteps() {
            testStepService.query({ test: vm.test.id }).$promise
                .then(
                    function (value) {
                        vm.testSteps = value.test_steps;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Unable to load test steps', e);
                    }
                );
        }

        function _createTest(testSuiteId){
            testService.save({ id: 0, name: 'Test 0', testsuite: testSuiteId }).$promise
                .then(
                    function (value) {
                        vm.test = value;

                        notifyService.onSuccess('Test successfully created');
                    }
                )
                .catch(
                    function(e){
                        console.error(e);
                    }
                );
        }

        function _getTest(testId){
            testService.get({ id: testId}).$promise
                .then(
                    function (value) {
                        vm.test = value;

                        _loadTestSteps();
                    }
                )
                .catch(
                    function(e){
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

            var modalInstance = _buildModalInstance(newTestStep, "Add Test Step");

            modalInstance.result.then(function (testStep){
                var highestValue = 1;

                angular.forEach(vm.testSteps, function (item, key){
                    if (item.stepNumber >= highestValue){
                        highestValue = item.stepNumber + 1;
                    }
                });

                testStep.stepNumber = highestValue;

                testStepService.save(testStep).$promise
                    .then(
                        function (data){
                            vm.testSteps.push(data);

                            notifyService.onSuccess('Test step successfully saved');
                        }
                    )
                    .catch(
                        function(e){
                            notifyService.onError('Unable to add test', e);
                        }
                    );
            },
            function () {
                vm.loadTestSteps();
            });
        }

        function _editTestStep(id) {
            testStepService.get({ id: id }).$promise
                .then(
                    function (value) {
                        var modalInstance = _buildModalInstance(value, "Edit Test Step");

                        modalInstance.result.then(function (testStep){
                            testStepService.update(testStep)
                                .then(
                                    function(){
                                        notifyService.onSuccess('Test step successfully updated');
                                    }
                                )
                                .catch(
                                    function(e){
                                        notifyService.onError('Unable to update test step', e);
                                    }
                                );
                        });
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Unable to load test step', e);
                    }
                );
        }

        function _removeTestStep(id) {
            testStepService.remove({ id: id }).$promise
                .then(
                    function(){
                        notifyService.onSuccess('Test step successfully removed');
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Unable to delete test step', e);
                    }
                );
        }

        function _save() {
            testService.update({id: vm.test.id}).$promise
                .then(
                    function(){
                        notifyService.onSuccess('Test successfully updated');
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Unable to save test', e);
                    }
                );
        }
    }

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
