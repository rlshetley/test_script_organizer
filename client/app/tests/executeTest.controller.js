(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.tests')
        .controller('executeTestController', executeTestController);

    executeTestController.$inject = ['testStepService', 'testResultService', '$routeParams', '$location'];

    function executeTestController(testStepService, testResultService, $routeParams, $location) {

        /* jshint validthis: true */
        var vm = this;

        vm.nextStep = _nextStep;

        vm.testSessionId = $routeParams.testSessionId;

        vm.testSteps = [];

        vm.testStep = {};

        vm.testResult = {};

        _init();

        function _init() {
            testStepService.query({ test: $routeParams.testId }).$promise
                .then(
                    function (value) {
                        vm.testSteps = value.test_steps;

                        angular.forEach(vm.testSteps, function (testStep, key) {
                            if (testStep.stepNumber == 1) {
                                vm.testStep = testStep;
                            }
                        });
                    }
                )
                .catch(
                    function(e){
                        console.error(e);
                    }
                );
        }

        function _nextStep() {
            var nextStep = vm.testStep.stepNumber + 1;

            vm.testResult.testSessionId = vm.testSessionId;
            vm.testResult.testStepId = vm.testStep.id;

            testResultService.save(vm.testResult).$promise
                .then(
                    function (value) {

                        if (nextStep <= vm.testSteps.length) {
                            angular.forEach(vm.testSteps, function (testStep, key) {
                                if (testStep.stepNumber == nextStep) {
                                    vm.testStep = testStep;
                                }
                            });

                            vm.testResult.pass = false;
                            vm.testResult.actualResult = '';
                            vm.testResult.comments = '';
                        }
                        else {
                            $location.path('/completeTest/' + vm.testSessionId);
                        }
                    }
                )
                .catch(
                    function(e){
                        console.error(e);
                    }
                );
        }
    }
})();
