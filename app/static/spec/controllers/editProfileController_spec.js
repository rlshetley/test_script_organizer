'use strict';

describe('editProfileController', function() {
  var controller;
  var scope;

  beforeEach(function(){
    module('app', function($provide) {
    });
  });

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    controller = $controller('editProfileController', {
    });
  }));

  describe('editProfileController', function(){
  });
});
