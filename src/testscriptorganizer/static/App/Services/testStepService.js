(function () {
    'use strict';

    angular
        .module('app')
        .factory('testStepService', testStepService);

    testStepService.$inject = ['$resource'];

    function testStepService($resource)
    {
        return $resource(
            'api/teststeps/:id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByTest: { method: 'GET', url: 'api/teststepsbytest', isArray: true }
            });
    }
})();