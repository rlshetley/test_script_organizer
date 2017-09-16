(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .controller('activeTestSessionsController', activeTestSessionsController);

    activeTestSessionsController.$inject = ['testSessionService', '$state'];

    function activeTestSessionsController(testSessionService, $state) {
        /* jshint validthis: true */
        var vm = this;

        vm.displayTestSessions = [];

        vm.testSessions = [];
    }
})();
