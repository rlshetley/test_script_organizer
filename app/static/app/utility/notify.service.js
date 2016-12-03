(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.utility')
        .factory('notifyService', notifyService);

    notifyService.$inject = ['$log'];

    function notifyService($log){

        return {
            onError: _onError,
            onSuccess: _onSuccess,
            onWarning: _onWarning
        };

        function _onError(msg, error){
            $log.error(error);
        }

        function _onSuccess(msg){

        }

        function _onWarning(msg){

        }
    }
})();
