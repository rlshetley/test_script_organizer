(function () {
    'use strict';

    angular
        .module('app')
        .controller('userAdminController', userAdminController);

    userAdminController.$inject = ['userAdminService', 'roleManagementService', '$modal', 'notifyService'];

    function userAdminController(userAdminService, roleManagementService, $modal, notifyService){
        /* jshint validthis: true */
        var vm = this;

        vm.add = _add;

        vm.edit = _edit;

        vm.delete = _delete;

        vm.users = [];

        vm.roles = [];

        _init();

        function _init(){
            userAdminService.users.query().$promise
                .then(
                    function (data){
                        vm.users = data.users;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to load users", e);
                    }
                );

            userAdminService.roles.query().$promise
                .then(
                    function (data){
                        vm.roles = data.roles;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError("Unable to load roles", e);
                    }
                );
        }

        function _buildModalInstance(user, title, template){
            return $modal.open({
                templateUrl: template,
                controller: modalUserController,
                resolve:{
                    user: function (){
                        return user;
                    },
                    roles: function (){
                        return vm.roles;
                    }
                }
            });
        }

        function _add(){
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

            var modalInstance = _buildModalInstance(newUser, "Add a User", 'app/modules/users/addUserModal.tmpl.html');

            modalInstance.result.then(function (user){
                userAdminService.users.save(user).$promise
                    .then(
                        function (data){
                            vm.users.push(data);

                            notifyService.onSuccess("User added");
                        }
                    )
                    .catch(
                        function(e){
                            notifyService.onError("Unable to add user", e);
                        }
                    );
            });
        }

        function _edit(value){
            var modalInstance = _buildModalInstance(value, "Edit User", 'app/modules/users/editUserModal.tmpl.html');

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
        }

        function _delete(id){

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
        }
    }

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
