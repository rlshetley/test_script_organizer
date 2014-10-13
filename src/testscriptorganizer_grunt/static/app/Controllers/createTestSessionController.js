function createTestSessionController($scope, testService, testSessionService, testEventService, $routeParams, $location) {
    $scope.loadTest = function () {
        testService.get({ Id: $scope.testId })
            .$promise.then(function (value) {
                $scope.test = value;
            });
    }

    $scope.startTest = function () {
        var now = moment();

        $scope.testSession.Id = 0;
        $scope.testSession.testId = $scope.testId;
        $scope.testSession.startDate = now.toJSON();
        $scope.testSession.finishDate = now.toJSON();

        var result = testSessionService.save($scope.testSession)
            .$promise.then(
                function (value) {
                    $scope.testSession = value;

                    if ($scope.testEventId)
                    {
                        testEventService.addSession({ testEventId: $scope.testEventId, sessionId: value.id });
                    }

                    $scope.loadFirstTest();
                }
            );
    }

    $scope.loadFirstTest = function () {
        $location.path('/executeTest/' + $scope.testSession.id + '/' + $scope.testId);
    }

    $scope.testId = $routeParams.testId;

    if ($routeParams.testEventId)
    {
        $scope.testEventId = $routeParams.testEventId;
    }

    $scope.test;

    $scope.testSession = {};

    $scope.loadTest();
};