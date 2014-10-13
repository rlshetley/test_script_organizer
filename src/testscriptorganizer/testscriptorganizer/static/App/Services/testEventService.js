tsoApp.factory('testEventService',
    function ($resource)
    {
        return $resource(
            'api/testEvents/:Id',
            {},
            {
                getByProject: { method: 'GET', url: 'api/testEventsbyproject', isArray: true },
                getByTestSuite: { method: 'GET', url: 'api/testEventsbytestsuite', isArray: true }
            });
    });