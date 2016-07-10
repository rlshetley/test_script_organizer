(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .controller('menuController', menuController);

    menuController.$inject = ['userService', '$state'];

    function menuController(userService, $state){
        /* jshint validthis: true */
        var vm = this;

        _init();

        function _init(){
        }
    }
})();
