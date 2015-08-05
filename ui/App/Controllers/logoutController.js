(function () {
    'use strict';

    angular
        .module('app')
        .controller('logoutController', logoutController);

    logoutController.$inject = ['$scope', 'userService', '$location'];

	function logoutController($scope, userService, $location) {
		userService.logout();

		$location.path('/login');
	}
})();


