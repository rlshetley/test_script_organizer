'use strict';

describe('createTestSessionController', function() {
  var controller;
  var testService;
  var testSessionService;
  var scope;
  var routeParams;
  var testEventId = 20;
  var testId = 10;
  var location;
  var testEventResultsService;
  var notifyService;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testService', function($q) { return mockTestService($q); });
      $provide.factory('testSessionService', function($q) { return mockTestSessionService($q); });
      $provide.factory('testEventResultsService', function($q) { return mockTestEventResultsService($q); });
      $provide.factory('notifyService', function(){ return mockNotifyService(); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testService_, _$routeParams_, _testSessionService_, _$location_, _testEventResultsService_, _notifyService_) {
    scope = $rootScope.$new();
    testService = _testService_;
    testSessionService = _testSessionService_;
    location = _$location_;
    testEventResultsService = _testEventResultsService_;
    notifyService = _notifyService_;
    routeParams = { testEventId: testEventId, testId: testId };

    controller = $controller('createTestSessionController', {
        testService: testService,
        testSessionService: testSessionService,
        testEventResultsService: testEventResultsService,
        $routeParams: routeParams,
        $location: location,
        notifyService: notifyService
    });
  }));

  describe('createTestSessionController', function(){

    it('should get the test', function(){
      scope.$digest();

      expect(controller.test.id).toEqual(testId);
    });

    it('should start the test', function(){
      spyOn(testSessionService,'save').and.callThrough();
      spyOn(location,'path').and.callThrough();
      spyOn(testEventResultsService,'save').and.callThrough();

      controller.startTest();
      scope.$digest();

      expect(testSessionService.save).toHaveBeenCalled();

      var testSessionId = testSessionService.getLastSaveId();
      expect(controller.testSession.id).toEqual(testSessionId);
      expect(controller.testSession.test).toEqual(testId);

      var areTimeEqual = moment(controller.testSession.startDate).isSame(moment().toJSON(), 'day');
      expect(areTimeEqual).toBe(true);

      areTimeEqual = moment(controller.testSession.finishDate).isSame(moment().toJSON(), 'day');
      expect(areTimeEqual).toBe(true);

      expect(testEventResultsService.save).toHaveBeenCalled();

      expect(location.path).toHaveBeenCalledWith('/executeTest/' + testSessionId + '/' + testId);
    });

    it('should notify when starting a test fails', inject(function($q) {
      spyOn(testSessionService, 'save').and.returnValue(failService($q));
      controller.startTest();
      scope.$digest();
      expect(notifyService.onError).toHaveBeenCalled();
    }));
  });
});
