(function () {
    'use strict';

    angular
        .module('app')
        .controller('editProfileController', editProfileController);

    editProfileController.$inject = ['profileService'];

    function editProfileController(profileService){
        /* jshint validthis: true */
        var vm = this;

        vm.user = {};

        _init();

        function _init(){
        }
    }
})();
