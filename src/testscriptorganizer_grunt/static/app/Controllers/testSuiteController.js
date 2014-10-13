function testSuiteController($scope, testSuiteService, testEventService, $modal, $location, $routeParams) {
    $scope.loadTestSuites = function () {
        testSuiteService.getByProject({ project: $scope.projectId })
            .$promise.then(function (data) {
                $scope.testSuites = data;
            });
    }

    $scope.add = function () {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/TestSuiteModalDialog.html',
            controller: modalTestSuiteController,
            resolve:
            {
                testSuite: function ()
                {
                    return { id: 0, name: '', project: $scope.projectId };
                },
                title: function () {
                    return "Add a Test Suite";
                }
            }
        });

        modalInstance.result.then(function (testSuite) {
            testSuiteService.save(testSuite)
                .$promise.then(function (data) {
                    $scope.testSuites.push(data);
                });
        },
        function () {
        });
    };

    $scope.edit = function (testSuite) {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/TestSuiteModalDialog.html',
            controller: modalTestSuiteController,
            resolve:
            {
                testSuite: function () {
                    return testSuite;
                },
                title: function () {
                    return "Edit Test Suite";
                }
            }
        });

        modalInstance.result.then(function (data) {
            testSuiteService.update(data);
        },
        function () {
        });
    };

    $scope.remove = function (id) {
        testSuiteService.remove({ id: id });
    };

    $scope.createTestEvent = function (testSuiteId) {
        var modalInstance = $modal.open({
            templateUrl: 'static/App/Views/TestEventModalDialog.html',
            controller: modalTestEventController,
            resolve:
            {
                testEvent: function () {
                    return { id: 0, name: '', testSuite: testSuiteId, date: moment().toJSON() };
                }
            }
        });

        modalInstance.result.then(function (testSuite) {
            testEventService.save(testSuite)
                .$promise.then(function (data) {
                    $location.path('/testEvent/' + data.id);
                });
        },
        function () {
        });
    };

    $scope.projectId = $routeParams.projectId;

    $scope.loadTestSuites();
};

testSuiteController['$inject'] = ['$scope', 'testSuiteService', 'testEventService', '$modal', '$location', '$routeParams'];

var modalTestSuiteController = function ($scope, $modalInstance, testSuite, title) {
    $scope.testSuite = testSuite;

    $scope.title = title;

    $scope.ok = function () {
        $modalInstance.close($scope.testSuite);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
};