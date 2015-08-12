(function () {
    'use strict';

    angular
        .module('app')
        .factory('testSessionService', testSessionService);

    testSessionService.$inject = ['$resource'];

    function testSessionService($resource)
    {
        return $resource(
            'api/testsessions/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    };
})();