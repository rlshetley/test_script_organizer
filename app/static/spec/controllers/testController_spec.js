'use strict';

describe('testController', function() {
  var controller;
  var testService;
  var scope;
  var routeParams;
  var testSuiteId = 10;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testService', function($q) { return mockTestService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope,  _$modal_, _testService_) {
    scope = $rootScope.$new();
    testService = _testService_;

    spyOn( _$modal_, 'open').and.returnValue(mockModal);

    routeParams = { testSuiteId: testSuiteId };

    controller = $controller('testController', {
        testService: testService,
        $modal:  _$modal_,
        $routeParams: routeParams
    });
  }));

  describe('testController', function(){

    it('should get all tests', function(){
      scope.$digest();
      expect(controller.tests.length).toEqual(2);
    });

    it('should remove a test', function(){
      spyOn(testService,'remove').and.callThrough();
      controller.remove(10);
      scope.$digest();
      expect(testService.remove).toHaveBeenCalled();
    });

  });
});
