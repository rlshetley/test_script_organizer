'use strict';

describe('loginController', function() {
  var controller;
  var userService;
  var scope;
  var location;

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('userService', function($q) { return mockUserService($q); });
    });
  });

  beforeEach(inject(function($controller, $rootScope, _userService_, _$location_) {
    scope = $rootScope.$new();
    userService = _userService_;
    location = _$location_;
    spyOn(location,'path').and.callThrough();

    controller = $controller('loginController', {
        userService: userService,
        $location: location
    });
  }));

  describe('loginController', function(){
    it('should login', function(){
      spyOn(userService,'login').and.callThrough();
      controller.login();
      scope.$digest();
      expect(userService.login).toHaveBeenCalled();
      expect(location.path).toHaveBeenCalledWith('/projects');
    });

  });
});
