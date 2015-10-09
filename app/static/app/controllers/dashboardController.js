(function () {
    'use strict';

    angular
        .module('app')
        .controller('dashboardController', dashboardController);

    dashboardController.$inject = [];

    function dashboardController() {
        /* jshint validthis: true */
        var vm = this;

        vm.projects = [];

        _init();

        function _init() {
        }

    }
})();
