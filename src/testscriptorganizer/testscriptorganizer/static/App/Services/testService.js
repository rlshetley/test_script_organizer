tsoApp.factory('testService',
    function ($resource)
    {
        return $resource(
            'api/tests/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByProject: { method: 'GET', url: 'api/tests/byproject', isArray: true },
                getByTestSuite: { method: 'GET', url: 'api/tests/bytestsuite', isArray: true }
            });
    });