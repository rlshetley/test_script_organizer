(function () {
    'use strict';

    angular
        .module('app')
        .controller('testEventController', testEventController);

    testEventController.$inject = ['$scope', 'testEventService', '$modal', '$routeParams', '$location'];

	function testEventController($scope, testEventService, $modal, $routeParams, $location)
	{
		$scope.loadTestEvent = function ()
		{
			testEventService.get({ Id: $scope.testEventId })
				.$promise.then(function (data)
				{
					$scope.testEvent = data;
				});
		}

		$scope.startTest = function (testId)
		{
			$location.path('/createTestSession/' + testId + '/' + $scope.testEventId);
		};

		$scope.testEvent;

		$scope.testEventId = $routeParams.testEventId;

		$scope.loadTestEvent();
	};
})();