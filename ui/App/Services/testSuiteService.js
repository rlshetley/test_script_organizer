(function () {
    'use strict';

    angular
        .module('app')
        .factory('testSuiteService', testSuiteService);

    testSuiteService.$inject = ['$resource'];

    function testSuiteService($resource)
    {
        return $resource(
            'api/testsuites/:id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByProject: { method: 'GET', url: 'api/testsuitesbyproject', isArray: true }
            });
    }
})();