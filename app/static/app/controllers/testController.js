(function () {
    'use strict';

    angular
        .module('app')
        .controller('testController', testController);

    testController.$inject = ['$scope', 'testService', '$modal', '$routeParams'];

    function testController($scope, testService, $modal, $routeParams) {
        function init() {
            testService.query({ testsuite: $scope.testSuiteId }).$promise
                .then(
                    function (data) {
                        $scope.tests = data.tests
                    }
                );
        }

        $scope.add = function () {
        };

        $scope.edit = function (id) {
        };

        $scope.remove = function (id) {
            testService.remove({ id: id });
        };

        $scope.testSuiteId = $routeParams.testSuiteId;

        init();
    };
})();
