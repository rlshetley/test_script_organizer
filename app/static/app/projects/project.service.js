(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.projects')
        .factory('projectService', projectService);

    projectService.$inject = ['$resource'];

    function projectService($resource){
        var projectResource = $resource(
            '/api/projects/:Id/',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });

        var testSuiteResource = $resource(
            '/api/testsuites/:id',
            {},
            {
                query: { method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });

        return {
            projects: projectResource,
            testSuites: testSuiteResource
        };
    }
})();
