(function () {
    'use strict';

    angular
        .module('app')
        .controller('testEventController', testEventController);

    testEventController.$inject = ['testEventService', 'testService', '$routeParams', '$location'];

    function testEventController(testEventService, testService, $routeParams, $location){
        /* jshint validthis: true */
        var vm = this;

        vm.startTest = _startTest;

        vm.testEvent = {};
        
        vm.tests = [];

        vm.testEventId = $routeParams.testEventId;

        _init();
        
        function _init(){
            testEventService.get({ id: vm.testEventId }).$promise
                .then(
                    function (data){
                        vm.testEvent = data;
                        
                        _loadTests();
                    }
                );
        }
        
        function _startTest(testId){
            $location.path('/createTestSession/' + testId + '/' + vm.testEventId);
        }
        
        function _loadTests(){
            testService.query({ testsuite: vm.testEvent.testSuite }).$promise
                .then(
                    function (data) {
                        vm.tests = data.tests;
                    }
                );
        }
    }
})();
