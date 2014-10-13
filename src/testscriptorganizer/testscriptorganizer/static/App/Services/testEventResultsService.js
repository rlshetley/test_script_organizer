tsoApp.factory('testEventResultsService',
    function ($resource) {
        return $resource(
            'api/testEventResults/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    });