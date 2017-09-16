(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testManagement')
        .controller('testListController', testListController);

    testListController.$inject = ['testService', '$stateParams'];

    function testListController(testService, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.add = _add;

        vm.edit = _edit;

        vm.remove = _remove;

        vm.tests = [];

        vm.testSuiteId = $stateParams.testSuiteId;

        _init();

        function _init() {
            testService.tests.query({ testsuite: vm.testSuiteId }).$promise
                .then(
                    function (data) {
                        vm.tests = data.tests;
                    }
                );
        }

        function _add() {

        }

        function _edit(id) {

        }

        function _remove(id) {
            testService.tests.remove({ id: id });
        }
    }
})();
