'use strict';

describe('testSuiteController', function() {
  var controller;
  var testSuiteService;
  var testEventService;
  var routeParams;
  var scope;
  var location;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testSuiteService', function($q) { return mockTestSuiteService($q); });
      $provide.factory('testEventService', function($q) { return mockTestEventService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testSuiteService_, _$modal_, _testEventService_, _$location_) {
    scope = $rootScope.$new();
    testSuiteService = _testSuiteService_;
    testEventService = _testEventService_;
    routeParams = {};
    location = _$location_;
    spyOn( _$modal_, 'open').and.returnValue(mockModal);
    controller = $controller('testSuiteController', {
        testSuiteService: testSuiteService,
        testEventService: testEventService,
        $routeParams: routeParams,
        $modal:  _$modal_,
        $location: _$location_
    });
  }));

  describe('testSuiteController', function(){

    it('should get all test suites', function(){
      scope.$digest();
      expect(controller.testSuites.length).toEqual(2);
    });

    it('should save a test suite', function(){
      spyOn(testSuiteService,'update').and.callThrough();
      controller.saveTestSuite({});
      scope.$digest();
      expect(testSuiteService.update).toHaveBeenCalled();
    });

    it('should remove a test suite', function(){
      spyOn(testSuiteService,'remove').and.callThrough();
      controller.remove(10);
      scope.$digest();
      expect(testSuiteService.remove).toHaveBeenCalled();
    });

    it('should add a test suite', function(){
      spyOn(testSuiteService,'save').and.callThrough();
      controller.add();
      mockModal.close({name : 'TestProject'});
      scope.$digest();
      expect(testSuiteService.save).toHaveBeenCalled();
      expect(controller.testSuites).toContain(jasmine.objectContaining({name : 'TestProject'}));
    });

    it('should create a test event', function(){
      var testSuiteid = 12;
      spyOn(testEventService,'save').and.callThrough();
      spyOn(location,'path').and.callThrough();
      controller.createTestEvent(testSuiteid);
      mockModal.close({name : 'TestProject'});
      scope.$digest();
      expect(testEventService.save).toHaveBeenCalled();

      var testEventId = testEventService.getLastSaveId();
      expect(location.path).toHaveBeenCalledWith('/testEvent/' + testEventId);
    });

  });
});
