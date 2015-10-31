'use strict';

describe('projectController', function() {
  var controller;
  var projectService;
  var testEventService;
  var notifyService;
  var scope;
  var location;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('projectService', function($q) { return mockProjectService($q); });
      $provide.factory('testEventService', function($q) { return mockTestEventService($q); });
      $provide.factory('notifyService', function(){ return mockNotifyService(); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _projectService_, _notifyService_, _$modal_, _testEventService_, _$location_) {
    scope = $rootScope.$new();
    projectService = _projectService_;
    testEventService = _testEventService_;
    notifyService = _notifyService_;
    location = _$location_;
    spyOn( _$modal_, 'open').and.returnValue(mockModal);
    controller = $controller('projectController', {
        projectService: projectService,
        testEventService: testEventService,
        notifyService: notifyService,
        $modal:  _$modal_,
        $location: _$location_
    });
  }));

  describe('projectController', function(){

    it('should get all projects', function(){
      scope.$digest();
      expect(controller.projects.length).toEqual(2);
    });

    it('should save a project', function(){
      spyOn(projectService,'update').and.callThrough();
      controller.saveProject({});
      scope.$digest();
      expect(notifyService.onSuccess).toHaveBeenCalled();
      expect(projectService.update).toHaveBeenCalled();
    });

    it('should remove a project', function(){
      spyOn(projectService,'remove').and.callThrough();
      controller.remove(10);
      scope.$digest();
      expect(notifyService.onSuccess).toHaveBeenCalled();
      expect(projectService.remove).toHaveBeenCalled();
    });

    it('should add a project', function(){
      spyOn(projectService,'save').and.callThrough();
      controller.add();
      mockModal.close({name : 'TestProject'});
      scope.$digest();
      expect(notifyService.onSuccess).toHaveBeenCalled();
      expect(projectService.save).toHaveBeenCalled();
      expect(controller.projects).toContain(jasmine.objectContaining({name : 'TestProject'}));
    });

    it('should notify when an update project fails', inject(function($q) {
      spyOn(projectService, 'update').and.returnValue(failService($q));
      controller.saveProject({});
      scope.$digest();
      expect(notifyService.onError).toHaveBeenCalled();
    }));

    it('should notify when a remove project fails', inject(function($q) {
      spyOn(projectService, 'remove').and.returnValue(failService($q));
      controller.remove(10);
      scope.$digest();
      expect(notifyService.onError).toHaveBeenCalled();
    }));

    it('should notify when a save project fails', inject(function($q) {
      spyOn(projectService, 'save').and.returnValue(failService($q));
      controller.add();
      mockModal.close({name : 'TestProject'});
      scope.$digest();
      expect(notifyService.onError).toHaveBeenCalled();
    }));

  });
});
