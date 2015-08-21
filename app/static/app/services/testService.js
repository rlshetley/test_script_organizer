(function () {
    'use strict';

    angular
        .module('app')
        .factory('testService', testService);

    testService.$inject = ['$resource'];

    function testService($resource)
    {
        return $resource(
            '/api/tests/:id',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    };
})();