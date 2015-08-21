(function () {
    'use strict';

    angular
        .module('app')
        .controller('editProfileController', editProfileController);

    editProfileController.$inject = ['$scope', 'profileService', 'userService'];

    function editProfileController($scope, profileService, userService){

        function init(){
            profileService.profile.query({ user_id: userService.userId }).$promise
                .then(
                    function (data){
                        $scope.user = data;
                    }
                )
                .catch(
                    function(e){
                    }
                );
        };

        $scope.user;

        init();
    }
})();
