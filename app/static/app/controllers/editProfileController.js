(function () {
    'use strict';

    angular
        .module('app')
        .controller('editProfileController', editProfileController);

    editProfileController.$inject = ['profileService', 'userService'];

    function editProfileController(profileService, userService){
        /* jshint validthis: true */
        var vm = this;

        vm.user = {};

        _init();
        
        function _init(){
            profileService.profile.query({ user_id: userService.userId }).$promise
                .then(
                    function (data){
                        vm.user = data;
                    }
                )
                .catch(
                    function(e){
                    }
                );
        }
    }
})();
