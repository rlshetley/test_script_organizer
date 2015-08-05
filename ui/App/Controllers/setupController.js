(function () {
    'use strict';

    angular
        .module('app')
        .controller('setupController', setupController);

    setupController.$inject = ['$scope', 'setupService'];

	function setupController($scope, setupService)
	{
		$scope.install = function ()
		{
			setupService.save();
		}
	};
})();