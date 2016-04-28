(function () {
    'use strict';

    angular
        .module('app')
        .config(configureApp);

    configureApp.$inject = ['editableOptions', '$resourceProvider'];

    function configureApp(editableOptions, $resourceProvider) {
        editableOptions.theme = 'bs3';
        $resourceProvider.defaults.stripTrailingSlashes = false;
    }
})();
