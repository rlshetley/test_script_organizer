(function () {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = ['projectService', 'notifyService', '$routeParams'];

    function dashboardController(projectService, notifyService, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.projects = [];

        _init();
        
        function _init() {
            projectService.query().$promise
                .then(
                    function (data) {
                        vm.projects = data.projects;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to load projects", e);
                    }
                );
        }
        
    }
})();