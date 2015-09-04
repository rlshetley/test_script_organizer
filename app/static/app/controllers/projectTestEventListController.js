(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectTestEventListController', projectTestEventListController);

    projectTestEventListController.$inject = ['testEventService', '$routeParams'];

    function projectTestEventListController(testEventService, $routeParams){
        /* jshint validthis: true */
        var vm = this;

        vm.remove = _remove;

        vm.testEvents = {};

        vm.projectId = $routeParams.projectId;

        _init();
        
        function _init(){
            testEventService.query({ project: vm.projectId }).$promise
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
