(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.dashboard')
        .controller('mainDashboardController', mainDashboardController);

    mainDashboardController.$inject = [
      'projectService',
      '$toastr'];

    function mainDashboardController(
      projectService,
      $toastr) {
        /* jshint validthis: true */
        var vm = this;

        _init();

        function _init(){
            projectService.projects.query().$promise
                .then(function (data) {
                    vm.projects = data.projects;
                })
                .catch(function(e){
                    $toastr.error('Unable to load projects');
                });
        }
    }
})();
