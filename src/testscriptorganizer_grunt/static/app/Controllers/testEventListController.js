function testEventListController($scope, testEventService, $routeParams)
{
    $scope.loadTestEvents = function ()
    {
        testEventService.getByTestSuite({ testSuiteId: $scope.testSuiteId })
            .$promise.then(function (data)
            {
                $scope.testEvents = data;
            });
    }

    $scope.remove = function (id)
    {
        testEventService.remove({ id: id });
    };

    $scope.testEvents;

    $scope.testSuiteId = $routeParams.testSuiteId;

    $scope.loadTestEvents();
};

testEventListController['$inject'] = ['$scope', 'testEventService', '$routeParams'];