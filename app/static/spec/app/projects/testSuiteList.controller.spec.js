'use strict';

describe('controller: testSuitesListController', function () {
    var controller;
    var scope;
    var state;

    beforeEach(module('testScriptOrganizer'));

    beforeEach(inject(function ($controller, $rootScope, $state) {
        scope = $rootScope.$new();

        state = $state;

        controller = $controller('testSuitesListController', {});
    }));
});