(function () {
    'use strict';

    angular
        .module('app')
        .controller('userAdminController', userAdminController);

    userAdminController.$inject = ['$scope', 'userAdminService', 'roleManagementService', '$modal', 'notifyService'];

    function userAdminController($scope, userAdminService, roleManagementService, $modal, notifyService){
        var thisController = this;

        thisController.init = function (){
            userAdminService.users.query().$promise
                .then(
                    function (data){
                        $scope.users = data;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to load users", e);
                    }
                );

            userAdminService.roles.query().$promise
                .then(
                    function (roles){
                        $scope.roles = roles;
                    }
                );
        };

        thisController.buildModalInstance = function(user, title, template){
            return $modal.open({
                templateUrl: template,
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
                username: '',
                password: '',
                confirmPassword: '',
                firstName: '',
                lastName: '',
                email: '',
                is_staff: false,
                is_active: true,
                groups: []
            };

            var modalInstance = thisController.buildModalInstance(newUser, "Add a User", 'static/App/Views/AddUserModalDialog.html');

            modalInstance.result.then(function (user){
                userAdminService.users.save(user).$promise
                    .then(
                        function (data){
                            $scope.users.push(data);

                            notifyService.onSuccess("User added");
                        }
                    )
                    .catch(
                        function(e){
                            notifyService.onError("Unable to add user", e);
                        }
                    );
            });
        };

        $scope.edit = function (value){
            var modalInstance = thisController.buildModalInstance(value, "Edit User", 'static/App/Views/EditUserModalDialog.html');

            modalInstance.result.then(function (user){
                userAdminService.users.update(user).$promise
                    .then(
                        function (data){
                            notifyService.onSuccess("User updated");
                        }
                    )
                    .catch(
                        function(e){
                            notifyService.onError("Unable to edit user", e);
                        }
                    );
            });
        };

        $scope.delete = function (id){

            userAdminService.users.remove({ Id: id }).$promise
                .then(
                    function (data){
                        notifyService.onSuccess("User deleted");
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to delete user", e);
                    }
                );
        };

        $scope.users = [];

        $scope.roles = [];

        thisController.init();
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
