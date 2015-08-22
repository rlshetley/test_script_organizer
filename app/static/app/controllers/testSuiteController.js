(function () {
    'use strict';

    angular
        .module('app')
        .controller('testSuiteController', testSuiteController);

    testSuiteController.$inject = ['$scope', 'testSuiteService', 'testEventService', '$modal', '$location', '$routeParams'];

    function testSuiteController($scope, testSuiteService, testEventService, $modal, $location, $routeParams) {
        function init() {
            testSuiteService.query({ project: $scope.projectId }).$promise
                .then(function (data) {
                        $scope.testSuites = data.test_suites;
                    }
                );
        }

        $scope.add = function () {
            var modalInstance = $modal.open({
                templateUrl: 'app/views/TestSuiteModalDialog.html',
                controller: modalTestSuiteController,
                resolve:{
                    testSuite: function (){
                        return { id: 0, name: '', project: $scope.projectId };
                    },
                    title: function () {
                        return "Add a Test Suite";
                    }
                }
            });

            modalInstance.result.then(function (testSuite) {
                testSuiteService.save(testSuite).$promise
                    .then(
                        function (data) {
                            $scope.testSuites.push(data);
                        }
                    );
            });
        };

        $scope.saveTestSuite = function (testSuite) {
            testSuiteService.update(testSuite);
        };

        $scope.remove = function (id) {
            testSuiteService.remove({ id: id });
        };

        $scope.createTestEvent = function (testSuiteId) {
            var modalInstance = $modal.open({
                templateUrl: 'app/views/TestEventModalDialog.html',
                controller: modalTestEventController,
                resolve:{
                    testEvent: function () {
                        return { id: 0, name: '', testSuite: testSuiteId, date: moment().toJSON() };
                    }
                }
            });

            modalInstance.result.then(function (testSuite) {
                testEventService.save(testSuite).$promise
                    .then(
                        function (data) {
                            $location.path('/testEvent/' + data.id);
                        }
                    );
            });
        };

        $scope.projectId = $routeParams.projectId;

        init();
    };

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

    var modalTestEventController = function ($scope, $modalInstance, testEvent) {
        $scope.testEvent = testEvent;

        $scope.title = '';

        $scope.ok = function () {
            $modalInstance.close($scope.testEvent);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    };
})();
