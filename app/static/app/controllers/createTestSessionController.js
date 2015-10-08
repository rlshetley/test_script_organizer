(function () {
    'use strict';

    angular
        .module('app')
        .controller('createTestSessionController', createTestSessionController);

    createTestSessionController.$inject = [
        'testService',
        'testSessionService',
        'testEventService',
        'testEventResultsService',
        '$routeParams',
        '$location',
        'notifyService'];

    function createTestSessionController(
        testService,
        testSessionService,
        testEventService,
        testEventResultsService,
        $routeParams,
        $location,
        notifyService) {

        /* jshint validthis: true */
        var vm = this;

        vm.startTest = _startTest;

        vm.loadFirstTest = _loadFirstTest;

        vm.testId = $routeParams.testId;

        if ($routeParams.testEventId){
            vm.testEventId = $routeParams.testEventId;
        }

        vm.test = {};

        vm.testSession = {};

        _init();

        function _init() {
            testService.get({ id: vm.testId }).$promise
                .then(
                    function (value) {
                        vm.test = value;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Failed to load test for test sessions', e);
                    }
                );
        }

        function _loadFirstTest(){
            $location.path('/executeTest/' + vm.testSession.id + '/' + vm.testId);
        }

        function _startTest() {
            var now = moment();

            vm.testSession.id = 0;
            vm.testSession.test = vm.testId;
            vm.testSession.startDate = now.toJSON();
            vm.testSession.finishDate = now.toJSON();

            testSessionService.save(vm.testSession).$promise
                .then(
                    function (value) {
                        vm.testSession = value;

                        testEventResultsService.save({ testEvent: vm.testEventId, testSession: value.id });

                        vm.loadFirstTest();
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Failed to start test session', e);
                    }
                );
        }
    }

})();
