tsoApp.factory('roleManagementService',
    function ($resource)
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
    });