﻿tsoApp.factory('testResultService',
    function ($resource) {
        return $resource(
            'api/testResults/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByTestSession: { method: 'GET', url: 'api/testresults/bysession', isArray: true }
            });
    });