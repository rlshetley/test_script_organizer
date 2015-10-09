'use strict';

describe('userService', function() {
  var service;
  var scope;
  var base64Service;
  var http;
  var httpBackend;
  var cookieStore = { remove: function(){}, get: function(){}, put: function(){} };
  var userId = 10;
  var response = {
    token: 'test_token',
    user: { id: userId }
  };

  beforeEach(function(){
    module('app', function($provide) {
      $provide.factory('base64Service', function() { return mockBase64Service(); });

      $provide.factory('$cookieStore', function() { return cookieStore; });
    });
  });

  beforeEach(inject(function($rootScope, $http, $httpBackend, _userService_, _base64Service_) {
    scope = $rootScope;
    httpBackend = $httpBackend;
    http = $http;
    base64Service= _base64Service_;
    service = _userService_;
  }));

  describe('userService', function(){

    it('should login', function(){
      spyOn(cookieStore,'put').and.callThrough();
      spyOn(base64Service,'encode').and.callThrough();

      httpBackend.when("GET", "/api/token/").respond(response);

      httpBackend.expectGET('/api/token/');

      service.login('test', 'password');

      httpBackend.flush();

      expect(cookieStore.put).toHaveBeenCalled();
      expect(base64Service.encode).toHaveBeenCalled();
      expect(service.isLoggedIn()).toBe(true);
      expect(service.getUser().id).toEqual(userId);
      expect(http.defaults.headers.common['Authorization']).toEqual('Token ' + response.token);
    });

    it('should logout', function(){
      spyOn(cookieStore,'remove').and.callThrough();
      spyOn(scope, '$broadcast');
      service.logout();
      expect(cookieStore.remove).toHaveBeenCalled();
      expect(scope.$broadcast).toHaveBeenCalledWith('loggedIn', false);
      expect(http.defaults.headers.common['Authorization']).not.toBeDefined();
    });

    it('should check the login', function(){
      spyOn(cookieStore,'get').and.returnValue('testing');

      var result = service.checkLogin();

      expect(result).toBe(true);
      expect(service.isLoggedIn()).toBe(true);
      expect(http.defaults.headers.common['Authorization']).toEqual('Token testing');
    });
  });
});
