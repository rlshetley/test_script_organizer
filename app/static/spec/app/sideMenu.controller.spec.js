'use strict';

describe('controller: sideMenuController', function () {
    var controller;
    var scope;

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('sideMenuController', {});
    }));
});