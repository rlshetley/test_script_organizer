'use strict';

describe('userAdminController', function() {
  var controller;
  var userAdminService;
  var roleManagementService;
  var notifyService;
  var scope;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('userAdminService', function($q) { return mockUserAdminService($q); });
      $provide.factory('roleManagementService', function($q) { return mockRoleManagementService($q); });
      $provide.factory('notifyService', function(){ return mockNotifyService(); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _userAdminService_, _notifyService_, _$modal_, _roleManagementService_) {
    scope = $rootScope.$new();
    userAdminService = _userAdminService_;
    roleManagementService = _roleManagementService_;
    notifyService = _notifyService_;
    spyOn( _$modal_, 'open').and.returnValue(mockModal);
    controller = $controller('userAdminController', {
        userAdminService: userAdminService,
        roleManagementService: roleManagementService,
        notifyService: notifyService,
        $modal:  _$modal_
    });
  }));

  describe('userAdminController', function(){

    it('should get all users and roles', function(){
      scope.$digest();
      expect(controller.users.length).toEqual(2);
      expect(controller.roles.length).toEqual(2);
    });

    it('should add a user', function(){
      spyOn(userAdminService.users,'save').and.callThrough();
      controller.add();
      mockModal.close({name : 'user'});
      scope.$digest();
      expect(userAdminService.users.save).toHaveBeenCalled();
      expect(notifyService.onSuccess).toHaveBeenCalled();
      expect(controller.users).toContain(jasmine.objectContaining({name : 'user'}));
    });

    it('should edit a user', function(){
      spyOn(userAdminService.users,'update').and.callThrough();
      controller.edit();
      mockModal.close({name : 'user'});
      scope.$digest({});
      expect(userAdminService.users.update).toHaveBeenCalled();
      expect(notifyService.onSuccess).toHaveBeenCalled();
    });

    it('should delete a user', function(){
      spyOn(userAdminService.users,'remove').and.callThrough();
      controller.delete(10);
      scope.$digest();
      expect(userAdminService.users.remove).toHaveBeenCalled();
    });
  });
});
