'use strict';

describe('menuController', function() {
  var controller;
  var userService;
  var scope;
  var location;
  var notifyService;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('userService', function($q) { return mockUserService(); });
      $provide.factory('notifyService', function(){ return mockNotifyService(); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _userService_, _$location_, _notifyService_) {
    scope = $rootScope.$new();
    userService = _userService_;
    location = _$location_;
    notifyService = _notifyService_;

    controller = $controller('menuController', {
        $scope: scope,
        userService: userService,
        notifyService: notifyService,
        $location: location
    });
  }));

  describe('menuController', function(){
    it('should load data in the controller', function(){
      expect(controller.name).toEqual(userService.name);
      expect(controller.loggedIn).toEqual(userService.isLogged);
      expect(controller.alerts.length).toEqual(notifyService.alerts.length);
    });

    it('should update the logged in value when the login event happens', function(){
      scope.$broadcast('loggedIn', false);
      expect(controller.loggedIn).toBe(false);
    });

  });
});
