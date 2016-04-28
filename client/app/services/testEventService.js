(function () {
    'use strict';

    angular
        .module('app')
        .factory('testEventService', testEventService);

    testEventService.$inject = ['$resource'];

    function testEventService($resource)
    {
        return $resource(
            '/api/testevents/:id',
            {},
            {
                query: {method: 'GET', isArray: false }
            });
    }
})();