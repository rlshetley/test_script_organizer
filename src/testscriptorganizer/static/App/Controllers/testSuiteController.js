﻿(function () {
    'use strict';

    angular
        .module('app')
        .controller('testSuiteController', testSuiteController);

    testSuiteController.$inject = ['$scope', 'testSuiteService', 'testEventService', '$modal', '$location', '$routeParams'];

    function testSuiteController($scope, testSuiteService, testEventService, $modal, $location, $routeParams) {
        this.init = function () {
            testSuiteService.getByProject({ project: $scope.projectId }).$promise
                .then(function (data) {
                        $scope.testSuites = data;
                    }
                );
        }

        $scope.add = function () {
            var modalInstance = $modal.open({
                templateUrl: 'static/App/Views/TestSuiteModalDialog.html',
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
                templateUrl: 'static/App/Views/TestEventModalDialog.html',
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

        this.init();
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
})();
