(function () {
    'use strict';

    angular
        .module('app')
        .controller('createTestSessionController', createTestSessionController);

    createTestSessionController.$inject = [
        '$scope',
        'testService',
        'testSessionService',
        'testEventService',
        'testEventResultsService',
        '$routeParams',
        '$location',
        'notifyService'];

    function createTestSessionController(
        $scope,
        testService,
        testSessionService,
        testEventService,
        testEventResultsService,
        $routeParams,
        $location,
        notifyService) {

        this.init = function () {
            testService.get({ id: $scope.testId }).$promise
                .then(
                    function (value) {
                        $scope.test = value;
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Failed to load test for test sessions', e);
                    }
                );
        }

        $scope.startTest = function () {
            var now = moment();

            $scope.testSession.id = 0;
            $scope.testSession.test = $scope.testId;
            $scope.testSession.startDate = now.toJSON();
            $scope.testSession.finishDate = now.toJSON();

            var result = testSessionService.save($scope.testSession).$promise
                .then(
                    function (value) {
                        $scope.testSession = value;

                        if ($scope.testEvent){
                            testEventResultsService.save({ testEvent: $scope.testEventId, testSession: value.id });
                        }

                        $scope.loadFirstTest();
                    }
                )
                .catch(
                    function(e){
                        notifyService.onError('Failed to start test session', e);
                    }
                );
        }

        $scope.loadFirstTest = function () {
            $location.path('/executeTest/' + $scope.testSession.id + '/' + $scope.testId);
        }

        $scope.testId = $routeParams.testId;

        if ($routeParams.testEventId){
            $scope.testEventId = $routeParams.testEventId;
        }

        $scope.test;

        $scope.testSession = {};

        this.init();
    };

})();
