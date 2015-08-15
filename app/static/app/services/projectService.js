(function () {
    'use strict';

    angular
        .module('app')
        .factory('projectService', projectService);

    projectService.$inject = ['$resource'];

    function projectService($resource){
        return $resource(
            '/api/projects/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    };
})();
