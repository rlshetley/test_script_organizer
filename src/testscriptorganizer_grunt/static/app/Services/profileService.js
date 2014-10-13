tsoApp.factory('profileService',
    function ($resource)
    {
        return {
            profile: $resource(
                    'api/profile/:id',
                    {},
                    {
                        update: { method: 'PUT', isArray: false }
                    })
        };
    });