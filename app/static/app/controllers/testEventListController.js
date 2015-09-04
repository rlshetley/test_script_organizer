(function () {
    'use strict';

    angular
        .module('app')
        .controller('testEventListController', testEventListController);

    testEventListController.$inject = ['testEventService', '$routeParams'];

    function testEventListController(testEventService, $routeParams){
        /* jshint validthis: true */
        var vm = this;

        vm.remove = _remove;

        vm.testEvents = [];

        vm.testSuiteId = $routeParams.testSuiteId;

        _init();
        
        function _init(){
            testEventService.query({ testSuiteId: vm.testSuiteId }).$promise
                .then(
                    function (data){
                        vm.testEvents = data.test_events;
                    }
                );
        }
        
        function _remove(id){
            testEventService.remove({ id: id });
        }
    }
})();
