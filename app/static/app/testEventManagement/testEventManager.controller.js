(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .controller('testEventManagerController', testEventManagerController);

    testEventManagerController.$inject = [
        'testEventManagementService',
        'testService',
        '$state',
        '$stateParams',
        '$toastr'
    ];

    function testEventManagerController(
        testEventManagementService,
        testService,
        $state,
        $stateParams,
        $toastr) {
        /* jshint validthis: true */
        var vm = this;

        vm.startTest = _startTest;

        vm.testEvent = {};

        vm.tests = [];

        vm.testEventId = $stateParams.testEventId;

        _init();

        function _init() {
            testEventManagementService.testEvents.get({ id: vm.testEventId }).$promise
                .then(function (data) {
                    vm.testEvent = data;

                    _loadTests();
                })
                .catch(function (e) {
                    $toastr.error('Failed to load test event');
                });
        }

        function _startTest(testId) {
            $state.go('CreatTestSession', { testId: testId, testEventId: vm.testEventId });
        }

        function _loadTests() {
            testService.tests.query({ testsuite: vm.testEvent.testSuite }).$promise
                .then(function (data) {
                    vm.tests = data.tests;
                })
                .catch(function (e) {
                    $toastr.error('Failed to load tests');
                });
        }

    }
})();
