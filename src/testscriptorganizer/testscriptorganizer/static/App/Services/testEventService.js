tsoApp.factory('testEventService',
    function ($resource)
    {
        return $resource(
            'api/testEvents/:Id',
            {},
            {
                getByProject: { method: 'GET', url: 'api/testEvents/byproject', isArray: true },
                getByTestSuite: { method: 'GET', url: 'api/testEvents/bytestsuite', isArray: true },
                addSession: { method: 'GET', url: 'api/testEvents/addsession', isArray: false }
            });
    });