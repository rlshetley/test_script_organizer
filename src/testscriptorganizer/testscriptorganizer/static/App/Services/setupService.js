tsoApp.factory('setupService',
    function ($resource)
    {
        return $resource(
            'api/install',
            {},
            {});
    });