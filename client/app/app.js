(function () {
    'use strict';

    angular.module('testScriptOrganizer', [
      'ui.bootstrap',
      'ngResource',
      'ui.router',
      'testScriptOrganizer.dashboard',
      'testScriptOrganizer.security',
      'testScriptOrganizer.admin',
      'testScriptOrganizer.projects']);
})();
