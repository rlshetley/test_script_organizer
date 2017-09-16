(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .controller('sideMenuController', sideMenuController);

    sideMenuController.$inject = ['$scope', 'userService', '$state'];

    function sideMenuController($scope, userService, $state) {
        /* jshint validthis: true */
        var vm = this;

        $scope.$on('loggedIn', function (event, value) {
            vm.loggedIn = value;
        });

        _init();

        function _init() {
            vm.loggedIn = userService.checkLogin();
        }
    }
})();
