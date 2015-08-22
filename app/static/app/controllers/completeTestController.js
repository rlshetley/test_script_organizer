(function () {
    'use strict';

    angular
        .module('app')
        .controller('completeTestController', completeTestController);

    completeTestController.$inject = ['testResultService', 'testSessionService', '$routeParams'];

    function completeTestController(testResultService, testSessionService, $routeParams) {
        var vm = this;
        
        vm.testSessionId = $routeParams.testSessionId;

        vm.testResults;

        _init();
        
        function _init() {
            testResultService.getByTestSession({ testSessionId: vm.testSessionId }).$promise
                    .then(
                        function (value) {
                            vm.testResults = value;

                            // Need to set the finish date/time for the test session
                            value.finishDate = moment().toJSON();

                            testSessionService.update(value);
                        }
                    )
                    .catch(
                        function(e){
                            vm.$log.error(e);
                        }
                    );
        }
    };
})();
