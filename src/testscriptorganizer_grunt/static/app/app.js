var tsoApp = angular.module('tso', ['ui.bootstrap', 'ngResource', 'ngRoute', 'ui.sortable', 'ngCookies', 'ngGrid', 'xeditable']).
  config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
      $routeProvider
          .when(
            '/projects',
            {
                templateUrl: 'static/App/Views/ProjectList.html',
                controller: 'projectController'
            })
          .when(
            '/tests/:testSuiteId',
            {
                templateUrl: 'static/App/Views/TestList.html',
                controller: 'testController'
            })
          .when(
            '/edittest/:testId',
            {
                templateUrl: 'static/App/Views/EditTest.html',
                controller: 'editTestController'
            })
          .when(
            '/addtest/:testId/:testSuiteId',
            {
                templateUrl: 'static/App/Views/EditTest.html',
                controller: 'editTestController'
            })
          .when(
            '/createTestSession/:testId/:testEventId',
            {
                templateUrl: 'static/App/Views/CreateTestSession.html',
                controller: 'createTestSessionController'
            })
          .when(
            '/executeTest/:testSessionId/:testId',
            {
                templateUrl: 'static/App/Views/ExecuteTest.html',
                controller: 'executeTestController'
            })
          .when(
            '/completeTest/:testSessionId',
            {
                templateUrl: 'static/App/Views/CompleteTest.html',
                controller: 'completeTestController'
            })
          .when(
            '/testEvent/:testEventId',
            {
                templateUrl: 'static/App/Views/TestEvent.html',
                controller: 'testEventController'
            })
          .when(
            '/projectTestEvents/:projectId',
            {
                templateUrl: 'static/App/Views/TestEventList.html',
                controller: 'projectTestEventListController'
            })
          .when(
            '/testEvents/:testSuiteid',
            {
                templateUrl: 'static/App/Views/TestEventList.html',
                controller: 'testEventListController'
            })
          .when(
            '/testSuites/:projectId',
            {
                templateUrl: 'static/App/Views/TestSuiteList.html',
                controller: 'testSuiteController'
            })
          .when(
            '/login',
            {
                templateUrl: 'static/App/Views/Login.html',
                controller: 'loginController'
            })
          .when(
            '/admin/user',
            {
                templateUrl: 'static/App/Views/UserAdmin.html',
                controller: 'userAdminController',
                role: 'Admin'
            })
          .when(
            '/profile/user',
            {
                templateUrl: 'static/App/Views/Profile.html',
                controller: 'editProfileController'
            })
          .when(
            '/admin/setup',
            {
                templateUrl: 'static/App/Views/Setup.html',
                controller: 'setupController'
            })
          .when(
            '/error/unauthorized',
            {
                templateUrl: 'static/App/Views/Unauthorized.html',
                controller: 'errorController'
            })
          .when('/logout',
            {
                templateUrl: 'static/App/Views/Logout.html',
                controller: 'logoutController'
            })
          .otherwise({ redirectTo: '/login' });
  }]);

tsoApp.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});

//tsoApp.config(['$httpProvider', function ($httpProvider) {
//    // django and angular both support csrf tokens. This tells
//    // angular which cookie to add to what header.
//    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
//    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
//}]);
