(function () {
    'use strict';

    angular
        .module('app')
        .controller('userAdminController', userAdminController);

    userAdminController.$inject = ['$scope', 'userAdminService', 'roleManagementService', '$modal'];

    function userAdminController($scope, userAdminService, roleManagementService, $modal){
        this.init = function (){
            userAdminService.users.query().$promise
                .then(
                    function (data){
                        $scope.users = data;
                    }
                );

            userAdminService.roles.query().$promise
                .then(
                    function (roles){
                        $scope.roles = roles;
                    }
                );
        };

        this.buildModalInstance = function(user, title){
            return $modal.open({
                templateUrl: 'static/App/Views/EditUserModalDialog.html',
                controller: modalUserController,
                resolve:{
                    user: function (){
                        return user;
                    },
                    roles: function (){
                        return $scope.roles;
                    }
                }
            });
        };

        $scope.add = function (){
            var newUser = {
                Id: 0,
                userName: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                email: '',
                is_staff: false,
                is_active: true
            };

            var modalInstance = this.buildModalInstance(newUser, "Add a User");

            modalInstance.result.then(function (user){
                userAdminService.users.save(user).$promise
                    .then(
                        function (data){
                            $scope.users.push(data);
                        }
                    );
            });
        };

        $scope.edit = function (value){
            var modalInstance = this.buildModalInstance(value, "Edit User");

            modalInstance.result.then(function (user){
                userAdminService.users.update(user);
            });
        };

        $scope.delete = function (id){
            userAdminService.users.remove({ Id: id });
        };

        $scope.users = [];

        $scope.roles = [];

        this.init();
    };

    var modalUserController = function ($scope, $modalInstance, user, roles){
        $scope.user = user;

        $scope.roles = [];

        angular.forEach(roles, function (item, key){
            var selected = false;
            angular.forEach(user.roles, function (userRoleName, userKey){
                if (userRoleName == item.name){
                    selected = true;
                }
            });

            this.push({ name: item.name, selected: selected });
        }, $scope.roles);

        $scope.ok = function (){
            $scope.user.roles = [];

            angular.forEach($scope.roles, function (item, key){
                if (item.selected){
                    this.push({ 'name': item.name });
                }
            }, $scope.user.roles);

            $modalInstance.close($scope.user);
        };

        $scope.cancel = function (){
            $modalInstance.dismiss('cancel');
        };
    };
})();
