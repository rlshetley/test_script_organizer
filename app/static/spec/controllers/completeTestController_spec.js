'use strict';

describe('completeTestController', function() {
  var controller;
  var testSessionService;
  var testResultService;
  var scope;
  var routeParams;
  var testSessionId = 20;
  var testResult = { id: 25 };

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testSessionService', function($q) { return mockTestSessionService($q); });
      $provide.factory('testResultService', function($q) { return mockTestResultService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testSessionService_, _testResultService_, _$routeParams_, $q) {
    scope = $rootScope.$new();
    testSessionService = _testSessionService_;
    testResultService = _testResultService_;
    routeParams = { testSessionId: testSessionId };

    testResultService.getByTestSession = function(){ return getByTestSession($q); };

    controller = $controller('completeTestController', {
        testResultService: testResultService,
        testSessionService: testSessionService,
        routeParams: routeParams
    });
  }));

  describe('completeTestController', function(){

    it('should get the test session for the test result and update the session', function(){
      spyOn(testSessionService,'update').and.callThrough();

      scope.$digest();

      var areTimeEqual = moment(controller.testResults.finishDate).isSame(moment().toJSON(), 'day');

      expect(areTimeEqual).toBe(true);

      expect(controller.testResults.id).toEqual(testResult.id);
      expect(testSessionService.update).toHaveBeenCalled();
    });
  });

  function getByTestSession($q){
    var defer = $q.defer();

    defer.resolve(testResult);

    return {
      $promise: defer.promise
    };
  }
});
