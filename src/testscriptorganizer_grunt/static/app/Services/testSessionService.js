tsoApp.factory('testSessionService',
    function ($resource) {
        return $resource(
            'api/testSessions/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    });