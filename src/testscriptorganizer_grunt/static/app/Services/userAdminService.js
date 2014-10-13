tsoApp.factory('userAdminService',
    function ($resource)
    {
        return {
            users: $resource(
                    'api/users/:id',
                    {},
                    {
                        update: { method: 'PUT', isArray: false }
                    }),
            roles: $resource(
                    'api/roles',
                    {},
                    {})
        };
    });