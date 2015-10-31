'use strict';

describe('testEventController', function() {
  var controller;
  var testService;
  var testEventService;
  var scope;
  var location;
  var routeParams;
  var testEventId = 25;
  var testId = 10;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testService', function($q) { return mockTestService($q); });
      $provide.factory('testEventService', function($q) { return mockTestEventService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testService_, _testEventService_, _$location_) {
    scope = $rootScope.$new();
    testService = _testService_;
    testEventService = _testEventService_;
    location = _$location_;
    routeParams = { testEventId: testEventId };

    controller = $controller('testEventController', {
        testService: testService,
        testEventService: testEventService,
        $location: _$location_,
        $routeParams: routeParams
    });
  }));

  describe('testEventController', function(){

    it('should load the test event', function(){
      scope.$digest();
      expect(controller.testEvent.id).toEqual(testEventId);
      expect(controller.tests.length).toEqual(2);
    });

    it('should start the test', function(){
      spyOn(location,'path').and.callThrough();

      controller.startTest(testId);

      expect(location.path).toHaveBeenCalledWith('/createTestSession/' + testId + '/' + testEventId);
    });

  });
});
