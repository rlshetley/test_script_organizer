tsoApp.factory('testSuiteService',
    function ($resource) {
        return $resource(
            'api/testsuites/:id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByProject: { method: 'GET', url: 'api/testsuitesbyproject', isArray: true }
            });
    });