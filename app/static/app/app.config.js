(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .config(configureApp);

    configureApp.$inject = ['$resourceProvider'];

    function configureApp($resourceProvider) {
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
})();
