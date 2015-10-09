'use strict';

describe('projectTestEventListController', function() {
  var controller;
  var testEventService;
  var scope;
  var routeParams;
  var projectId = 10;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('testEventService', function($q) { return mockTestEventService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _testEventService_) {
    scope = $rootScope.$new();
    testEventService = _testEventService_;
    routeParams = { projectId: projectId };

    controller = $controller('projectTestEventListController', {
        testEventService: testEventService,
        $routeParams: routeParams
    });
  }));

  describe('projectTestEventListController', function(){

    it('should load the test events', function(){
      scope.$digest();
      expect(controller.testEvents.length).toEqual(2);
    });

  });
});
