(function () {
    'use strict';

    angular
        .module('app')
        .factory('testSuiteService', testSuiteService);

    testSuiteService.$inject = ['$resource'];

    function testSuiteService($resource)
    {
        return $resource(
            '/api/testsuites/:id',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    }
})();