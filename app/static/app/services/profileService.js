
(function () {
    'use strict';

    angular
        .module('app')
        .factory('profileService', profileService);

    profileService.$inject = ['$resource'];

    function profileService($resource){
        return $resource(
            '/api/profile/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    }
})();
