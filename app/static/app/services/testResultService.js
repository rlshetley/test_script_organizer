(function () {
    'use strict';

    angular
        .module('app')
        .factory('testResultService', testResultService);

    testResultService.$inject = ['$resource'];

    function testResultService($resource)
    {
        return $resource(
            '/api/testresults/:id',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    }
})();