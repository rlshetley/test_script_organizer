(function () {
    'use strict';

    angular
        .module('app')
        .factory('userAdminService', userAdminService);

    userAdminService.$inject = ['$resource'];

    function userAdminService($resource)
    {
        return {
            users: $resource(
                    '/api/users/:id',
                    {},
                    {
                        update: { method: 'PUT', isArray: false }
                    }),
            roles: $resource(
                    '/api/roles',
                    {},
                    {})
        };
    }
})();