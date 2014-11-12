(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeTestController', completeTestController);

    completeTestController.$inject = ['$scope', 'testResultService', 'testSessionService', '$routeParams'];

	function completeTestController($scope, testResultService, testSessionService, $routeParams) {
		$scope.loadTestResults = function () {
			testResultService.getByTestSession({ testSessionId: $scope.testSessionId })
					.$promise.then(
						function (value) {
							$scope.testResults = value;

							// Need to set the finish date/time for the test session
							value.finishDate = moment().toJSON();

							testSessionService.update(value);
						}
					);
		}

		$scope.testSessionId = $routeParams.testSessionId;

		$scope.testResults;

		$scope.loadTestResults();
	};
})();