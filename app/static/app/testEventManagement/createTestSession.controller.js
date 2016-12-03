(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .controller('createTestSessionController', createTestSessionController);

    createTestSessionController.$inject = [
        'testSessionService',
        'testService',
        '$state',
        '$stateParams',
        '$toastr'
    ];

    function createTestSessionController(
        testSessionService,
        testService,
        $state,
        $stateParams,
        $toastr) {
        /* jshint validthis: true */
        var vm = this;

        vm.startTest = _startTest;

        vm.loadFirstTest = _loadFirstTest;

        vm.testId = $stateParams.testId;

        if ($state.testEventId) {
            vm.testEventId = $stateParams.testEventId;
        }

        vm.test = {};

        vm.testSession = {};

        _init();

        function _init() {
            testService.get({ id: vm.testId }).$promise
                .then(function (value) {
                    vm.test = value;
                })
                .catch(function (e) {
                    $toastr.error('Failed to load test for test sessions');
                });
        }

        function _loadFirstTest() {
            $state.go('ExecuteTest', { testSessionId: vm.testSession.id, testId: vm.testId });
        }

        function _startTest() {
            var now = moment();

            vm.testSession.id = 0;
            vm.testSession.test = vm.testId;
            vm.testSession.startDate = now.toJSON();
            vm.testSession.finishDate = now.toJSON();

            testSessionService.save(vm.testSession).$promise
                .then(function (value) {
                    vm.testSession = value;

                    vm.loadFirstTest();
                })
                .catch(function (e) {
                    $toastr.error('Failed to start test session');
                });
        }

    }
})();
