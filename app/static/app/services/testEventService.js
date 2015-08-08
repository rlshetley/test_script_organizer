(function () {
    'use strict';

    angular
        .module('app')
        .factory('testEventService', testEventService);

    testEventService.$inject = ['$resource'];

    function testEventService($resource)
    {
        return $resource(
            'api/testEvents/:Id',
            {},
            {
                getByProject: { method: 'GET', url: 'api/testEventsbyproject', isArray: true },
                getByTestSuite: { method: 'GET', url: 'api/testEventsbytestsuite', isArray: true }
            });
    }
})();