(function () {
    'use strict';

    angular
        .module('app')
        .factory('testService', testService);

    testService.$inject = ['$resource'];

    function testService($resource)
    {
        return $resource(
            'api/tests/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByProject: { method: 'GET', url: 'api/testsbyproject', isArray: true },
                getByTestSuite: { method: 'GET', url: 'api/testsbytestsuite', isArray: true }
            });
    };
})();