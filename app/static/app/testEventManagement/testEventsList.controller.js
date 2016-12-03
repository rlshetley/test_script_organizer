(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .controller('testEventsListController', testEventsListController);

    testEventsListController.$inject = ['testEventManagementService', '$stateParams'];

    function testEventsListController(testEventManagementService, $stateParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.testEvents = {};

        vm.projectId = $stateParams.projectId;

        _init();

        function _init() {
            testEventManagementService.testEvents.query({ project: vm.projectId }).$promise
                .then(function (data) {
                        vm.testEvents = data.testEvents;
                });
        }
    }
})();