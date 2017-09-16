'use strict';

describe('controller: menuController', function () {
    var controller;
    var scope;

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        controller = $controller('menuController', {});
    }));
});