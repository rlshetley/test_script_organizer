(function () {
    'use strict';

    angular
        .module('app')
        .factory('notifyService', notifyService);

    notifyService.$inject = ['$log'];

    function notifyService($log){
        var scope = this;

        scope.alerts = [];

        return {
            alerts: scope.alerts,
            $log: $log,
            onError: onError,
            onSuccess: function(msg) { addAlert('success', msg); }
        };

        function onError(msg, error){
            $scope.$log.error(error);
            addAlert('danger', msg);
        };

        function addAlert(type, msg) {
            scope.alerts.push({
              type: type,
              msg: msg,
              close: function() { closeAlert(this);  } });
        };

        function closeAlert(alert) {
            var index = scope.alerts.indexOf(alert);
            scope.alerts.splice(index, 1);
        };
    }
})();
