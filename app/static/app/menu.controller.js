(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .controller('menuController', menuController);

    menuController.$inject = ['$scope', 'userService', '$state'];

    function menuController($scope, userService, $state){
        /* jshint validthis: true */
        var vm = this;

        _init();

        $scope.$on('loggedIn', function (event, value) {
            vm.loggedIn = value;
        });

        _init();

        function _init() {
            vm.loggedIn = userService.checkLogin();
        }
    }
})();
