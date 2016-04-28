(function () {
    'use strict';

    angular
        .module('app')
        .factory('testStepService', testStepService);

    testStepService.$inject = ['$resource'];

    function testStepService($resource)
    {
        return $resource(
            '/api/teststeps/:id',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    }
})();