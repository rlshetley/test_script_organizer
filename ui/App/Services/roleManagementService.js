(function () {
    'use strict';

    angular
        .module('app')
        .factory('roleManagementService', roleManagementService);

    roleManagementService.$inject = ['$resource'];

    function roleManagementService($resource)
    {
        return {
            assignRoleService: $resource(
            'api/assignroles',
            {},
            {}),
            unassignRoleService: $resource(
            'api/unassignroles',
            {},
            {})
        };
    }
})();