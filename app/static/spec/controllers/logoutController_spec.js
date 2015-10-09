'use strict';

describe('logoutController', function() {
  var controller;
  var userService;
  var scope;
  var location;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('userService', function($q) { return mockUserService(); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _userService_, _$location_) {
    scope = $rootScope.$new();
    userService = _userService_;
    location = _$location_;

    spyOn(userService,'logout').and.callThrough();
    spyOn(location,'path').and.callThrough();

    controller = $controller('logoutController', {
        userService: userService,
        $location: location
    });
  }));

  describe('logoutController', function(){
    it('should logout', function(){
      expect(userService.logout).toHaveBeenCalled();
      expect(location.path).toHaveBeenCalledWith('/login');
    });

  });
});
