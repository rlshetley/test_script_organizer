(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.tests')
        .controller('testController', testController);

    testController.$inject = ['testService', '$modal', '$routeParams'];

    function testController(testService, $modal, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.add = _add;

        vm.edit = _edit;

        vm.remove = _remove;

        vm.tests = [];

        vm.testSuiteId = $routeParams.testSuiteId;

        _init();

        function _init() {
            testService.query({ testsuite: vm.testSuiteId }).$promise
                .then(
                    function (data) {
                        vm.tests = data.tests;
                    }
                );
        }

        function _add(){

        }

        function _edit(id){

        }

        function _remove(id) {
            testService.remove({ id: id });
        }
    }
})();
