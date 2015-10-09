'use strict';

describe('dashboardController', function() {
  var controller;
  var scope;

  beforeEach(function(){
    module('app', function($provide) {
    });
  });

  beforeEach(inject(function($controller, $rootScope) {
    scope = $rootScope.$new();

    controller = $controller('dashboardController', {
    });
  }));

  describe('dashboardController', function(){
  });
});
