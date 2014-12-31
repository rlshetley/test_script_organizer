(function () {
    'use strict';

    angular
        .module('app')
        .controller('editProfileController', editProfileController);

    editProfileController.$inject = ['$scope', 'profileService', 'userService'];

    function editProfileController($scope, profileService, userService){

        this.init = function (){
            profileService.profile.query({ Id: userService.userId }).$promise
                .then(
                    function (data){
                        $scope.user = data;
                    }
                )
                .catch(
                    function(e){
                        $scope.$log.error(e);
                    }
                );
        };

        $scope.user;

        this.init();
    }
})();
