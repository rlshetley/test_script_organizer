(function () {
    'use strict';

    angular
        .module('app')
        .factory('notifyService', notifyService);

    notifyService.$inject = ['$log'];

    function notifyService($log){
        /* jshint validthis: true */
        var scope = this;

        scope.alerts = [];

        return {
            alerts: scope.alerts,
            $log: $log,
            onError: _onError,
            onSuccess: function(msg) { _addAlert('alert-success', msg); },
            onWarning: function(msg) { _addAlert('alert-warning', msg); }
        };

        function _onError(msg, error){
            $log.error(error);
            _addAlert('alert-danger', msg);
        }

        function _addAlert(type, msg) {
            scope.alerts.push({
              type: type,
              msg: msg,
              close: function() { _closeAlert(this);  } });
        }

        function _closeAlert(alert) {
            var index = scope.alerts.indexOf(alert);
            scope.alerts.splice(index, 1);
        }
    }
})();
