(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testSuites')
        .controller('testSuiteController', testSuiteController);

    testSuiteController.$inject = ['testSuiteService', 'testEventService', '$modal', '$location', '$routeParams'];

    function testSuiteController(testSuiteService, testEventService, $modal, $location, $routeParams) {
        /* jshint validthis: true */
        var vm = this;

        vm.add = _add;

        vm.saveTestSuite = _saveTestSuite;

        vm.remove = _remove;

        vm.createTestEvent = _createTestEvent;

        vm.projectId = $routeParams.projectId;

        vm.testSuites = [];

        _init();

        function _init() {
            testSuiteService.query({ project: vm.projectId }).$promise
                .then(function (data) {
                        vm.testSuites = data.test_suites;
                    }
                );
        }

        function _add() {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/testSuites/testSuiteModal.tmpl.html',
                controller: modalTestSuiteController,
                resolve:{
                    testSuite: function (){
                        return { id: 0, name: '', project: vm.projectId };
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
                            vm.testSuites.push(data);
                        }
                    );
            });
        }

        function _saveTestSuite(testSuite) {
            testSuiteService.update(testSuite);
        }

        function _remove(id) {
            testSuiteService.remove({ id: id });
        }

        function _createTestEvent(testSuiteId) {
            var modalInstance = $modal.open({
                templateUrl: 'app/modules/testSuites/testEventModal.tmpl.html',
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
        }
    }

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
