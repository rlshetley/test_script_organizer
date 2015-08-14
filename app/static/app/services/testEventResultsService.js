(function () {
    'use strict';

    angular
        .module('app')
        .factory('testEventResultsService', testEventResultsService);

    testEventResultsService.$inject = ['$resource'];

    function testEventResultsService($resource){
        return $resource(
            '/api/testeventresults/:Id',
            {},
            {
                update: { method: 'PUT', isArray: false }
            });
    }
})();
