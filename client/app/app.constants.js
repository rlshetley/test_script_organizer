(function () {
    'use strict';

    angular
        .module('testScriptOrganizer')
        .constant('$appConfig', {
            APP_NAME: 'TEST SCRIPT ORGANIZER',
            APP_VERSION: '1.0.0',
            API: 'http://127.0.0.1:8000/'
        })
        .constant('$toastr', toastr)
        .constant('$moment', moment)
        .constant('$sprintf', sprintf);
}());
