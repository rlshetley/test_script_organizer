'use strict';

describe('testEventListController', function() {
  var controller;
  var testEventService;
  var scope;
  var routeParams;
  var testSuiteId = 10;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testEventService', function($q) { return mockTestEventService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testEventService_) {
    scope = $rootScope.$new();
    testEventService = _testEventService_;
    routeParams = { testSuiteId: testSuiteId };

    controller = $controller('testEventListController', {
        testEventService: testEventService,
        $routeParams: routeParams
    });
  }));

  describe('testEventListController', function(){

    it('should load the test events', function(){
      scope.$digest();
      expect(controller.testEvents.length).toEqual(2);
    });

  });
});
