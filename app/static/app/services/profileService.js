
(function () {
    'use strict';

    angular
        .module('app')
        .factory('profileService', profileService);

    profileService.$inject = ['$resource'];

    function profileService($resource){
        return $resource(
            '/api/profile/:id',
            {},
            {
                query: {method: 'GET', isArray: false },
                update: { method: 'PUT', isArray: false }
            });
    }
})();
