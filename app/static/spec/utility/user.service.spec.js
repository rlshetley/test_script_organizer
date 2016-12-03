'use strict';

describe('service: userService', function () {
    var userService;
    var scope;
    var base64Service;
    var http;
    var httpBackend;
    var cookieStore;
    var userId = 10;
    var response = {
        token: 'test_token',
        user: { id: userId }
    };

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function (_userService_, $rootScope, $http, $httpBackend, $cookieStore, _base64Service_) {
        scope = $rootScope;
        userService = _userService_;
        base64Service = _base64Service_;
        httpBackend = $httpBackend;
        cookieStore = $cookieStore;
        http = $http;
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });


    it('should login', function () {
        var userName = 'test';
        var password = 'password';

        spyOn(cookieStore, 'put');
        spyOn(base64Service, 'encode');

        httpBackend.when("GET", "/api/token/").respond(response);

        httpBackend.expectGET('/api/token/');

        userService.login('test', 'password');

        httpBackend.flush();

        expect(cookieStore.put).toHaveBeenCalledWith('localtoken', response.token);
        expect(base64Service.encode).toHaveBeenCalledWith(userName + ':' + password);
        expect(userService.isLoggedIn()).toBe(true);
        expect(userService.getUser().id).toEqual(userId);
        expect(http.defaults.headers.common['Authorization']).toEqual('Token ' + response.token);
    });

    it('should logout', function () {
        spyOn(cookieStore, 'remove').and.callThrough();
        spyOn(scope, '$broadcast');
        userService.logout();
        expect(cookieStore.remove).toHaveBeenCalledWith('localtoken');
        expect(scope.$broadcast).toHaveBeenCalledWith('loggedIn', false);
        expect(http.defaults.headers.common['Authorization']).not.toBeDefined();
    });

    it('should check the login and return true is cookie exists', function () {
        spyOn(cookieStore, 'get').and.returnValue('testing');

        var result = userService.checkLogin();

        expect(result).toBe(true);
    });

    it('should check the login and return false if cookie does not exists', function () {
        spyOn(cookieStore, 'get').and.returnValue(null);

        var result = userService.checkLogin();

        expect(result).toBe(false);
    });
});