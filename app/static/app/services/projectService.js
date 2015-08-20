(function () {
    'use strict';

    angular
        .module('app')
        .factory('projectService', projectService);

    projectService.$inject = ['$resource'];

    function projectService($resource){
        return $resource(
            '/api/projects/:Id/',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    };
})();