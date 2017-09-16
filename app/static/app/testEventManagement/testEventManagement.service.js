(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.testEventManagement')
        .factory('testEventManagementService', testEventManagementService);

    testEventManagementService.$inject = ['$resource'];

    function testEventManagementService($resource) {
        var testSessionResource = $resource(
            '/api/testsessions/:id',
            {},
            {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });

        var testEventResource = $resource(
            '/api/testevents/:id',
            {},
            {
                query: { method: 'GET', isArray: false }
            });

        return {
            testSessions: testSessionResource,
            testEvents: testEventResource
        };
    }
})();