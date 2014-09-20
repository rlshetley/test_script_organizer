function userAdminController($scope, userAdminService, roleManagementService, $modal)
{
    $scope.load = function ()
    {
        userAdminService.users.query().$promise
            .then(function (data)
            {
                $scope.users = data;
            });

        userAdminService.roles.query().$promise
            .then(function (roles)
            {
                $scope.roles = roles;
            });
    };

    $scope.add = function ()
    {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/AddUserModalDialog.html',
            controller: modalUserController,
            resolve:
            {
                user: function ()
                {
                    return{ 
                        Id: 0, 
                        userName: '',
                        password: '',
                        confirmPassword: '',
                        firstName: '',
                        lastName: '',
                        email: ''
                    };
                },
                roles: function ()
                {
                    return $scope.roles;
                }
            }
        });

        modalInstance.result.then(function (user)
        {
            userAdminService.users.save(user)
                .$promise.then(function (data)
                {
                    $scope.users.push(data);
                });
        },
        function ()
        {
        });
    };

    $scope.edit = function (user)
    {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/EditUserModalDialog.html',
            controller: modalUserController,
            resolve:
            {
                user: function ()
                {
                    return user;
                },
                roles: function ()
                {
                    return $scope.roles;
                }
            }
        });

        modalInstance.result.then(function (user)
        {
            userAdminService.users.update(user);
        },
        function ()
        {
        });
    };

    $scope.delete = function (id)
    {
        userAdminService.users.remove({ Id: id });
    };

    $scope.users = [];

    $scope.roles = [];

    $scope.load();
};

userAdminController['$inject'] = ['$scope', 'userAdminService', 'roleManagementService', '$modal'];

var modalUserController = function ($scope, $modalInstance, user, roles)
{
    $scope.user = user;

    $scope.roles = [];

    angular.forEach(roles, function (item, key)
    {
        var selected = false;
        angular.forEach(user.roles, function (userRoleName, userKey)
        {
            if (userRoleName == item.name)
            {
                selected = true;
            }
        });

        this.push({ name: item.name, selected: selected });
    }, $scope.roles);

    $scope.ok = function ()
    {
        $scope.user.roles = [];

        angular.forEach($scope.roles, function (item, key)
        {
            if (item.selected)
            {
                this.push({ 'name': item.name });
            }
        }, $scope.user.roles);

        $modalInstance.close($scope.user);
    };

    $scope.cancel = function ()
    {
        $modalInstance.dismiss('cancel');
    };
};