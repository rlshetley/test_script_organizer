tsoApp.factory('testStepService',
    function ($resource)
    {
        return $resource(
            'api/teststeps/:id',
            {},
            {
                update: { method: 'PUT', isArray: false },
                getByTest: { method: 'GET', url: 'api/teststepsbytest', isArray: true }
            });
    });