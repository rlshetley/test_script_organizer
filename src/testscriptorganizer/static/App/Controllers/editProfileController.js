(function () {
    'use strict';

    angular
        .module('app')
        .controller('editProfileController', editProfileController);

    editProfileController.$inject = ['$scope', 'profileService', 'userService'];

    function editProfileController($scope, profileService, userService){

        $scope.load = function (){
            profileService.profile.query({ Id: userService.userId })
                .$promise.then(
                    function (data){
                        $scope.user = data;
                    });
        };

        $scope.user;

        $scope.load();
    }
})();
