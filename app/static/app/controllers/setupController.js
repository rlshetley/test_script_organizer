(function () {
    'use strict';

    angular
        .module('app')
        .controller('setupController', setupController);

    setupController.$inject = ['setupService'];

	function setupController(setupService){
	    var vm = this;
		vm.install = _install;
		
		function _install(){
			setupService.save();
		}
	};
})();
