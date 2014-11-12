(function () {
    'use strict';

    angular
        .module('app')
        .factory('testResultService', testResultService);

    testResultService.$inject = ['$resource'];

    function testResultService($resource)
    {
        return $resource(
            'api/testResults/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByTestSession: { method: 'GET', url: 'api/testresultsbysession', isArray: true }
            });
    }
})();