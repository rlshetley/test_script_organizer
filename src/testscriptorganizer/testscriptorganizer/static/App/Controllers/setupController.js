function setupController($scope, setupService)
{
    $scope.install = function ()
    {
        setupService.save();
    }
};

setupController['$inject'] = ['$scope', 'setupService'];