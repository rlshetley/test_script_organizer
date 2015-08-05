(function () {
    'use strict';

    angular
        .module('app')
        .controller('projectTestEventListController', projectTestEventListController);

    projectTestEventListController.$inject = ['$scope', 'testEventService', '$routeParams'];

	function projectTestEventListController($scope, testEventService, $routeParams)
	{
		$scope.loadTestEvents = function ()
		{
			testEventService.getByProject({ projectId: $scope.projectId })
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

		$scope.projectId = $routeParams.projectId;

		$scope.loadTestEvents();
	};
})();