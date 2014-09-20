tsoApp.factory('projectService',
    function ($resource) {
        return $resource(
            'api/projects/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    });
