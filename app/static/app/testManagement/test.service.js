(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testManagement')
        .factory('testService', testService);

    testService.$inject = ['$resource'];

    function testService($resource) {
        var testsResource = $resource(
            '/api/tests/:id',
            {},
            {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });

        var testStepsResource = $resource(
            '/api/teststeps/:id',
            {},
            {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });

        return {
            tests: testsResource,
            testSteps: testStepsResource
        };

    }
})();