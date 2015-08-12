	
(function () {
    'use strict';

    angular
        .module('app')
        .factory('setupService', setupService);

    setupService.$inject = ['$resource'];

    function setupService($resource)
    {
        return $resource(
            '/api/install',
            {},
            {});
    }
})();