(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeTestController', completeTestController);

    completeTestController.$inject = ['$scope', 'testResultService', 'testSessionService', '$routeParams'];

    function completeTestController($scope, testResultService, testSessionService, $routeParams) {
        function init() {
            testResultService.getByTestSession({ testSessionId: $scope.testSessionId }).$promise
                    .then(
                        function (value) {
                            $scope.testResults = value;

                            // Need to set the finish date/time for the test session
                            value.finishDate = moment().toJSON();

                            testSessionService.update(value);
                        }
                    )
                    .catch(
                        function(e){
                            $scope.$log.error(e);
                        }
                    );
        }

        $scope.testSessionId = $routeParams.testSessionId;

        $scope.testResults;

        init();
    };
})();
