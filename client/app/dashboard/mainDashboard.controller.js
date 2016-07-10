(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.dashboard')
        .controller('mainDashboardController', mainDashboardController);

    mainDashboardController.$inject = [
      'userService',
      '$state',
      'projectService',
      'notifyService'];

    function mainDashboardController(
      userService,
      $state,
      projectService,
      notifyService){
        /* jshint validthis: true */
        var vm = this;

        _init();

        function _init(){
            projectService.query().$promise
                .then(
                    function (data) {
                        vm.projects = data.projects;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Unable to load projects', e);
                    }
                );
        }
    }
})();
