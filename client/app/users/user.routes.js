(function () {
    'use strict';

    angular
        .module('testScriptOrganizer.users')
        .config(configureRoutes);

    configureRoutes.$inject = ['$routeProvider'];

    function configureRoutes($routeProvider) {
        $routeProvider
          .when(
            '/login',
            {
                templateUrl: 'app/modules/users/login.tmpl.html',
                controller: 'loginController',
                controllerAs: 'vm'
            })
          .when(
            '/admin/user',
            {
                templateUrl: 'app/modules/users/userAdmin.tmpl.html',
                controller: 'userAdminController',
                controllerAs: 'vm',
                role: 'Admin'
            })
          .when(
            '/profile/user',
            {
                templateUrl: 'app/modules/users/profile.tmpl.html',
                controller: 'editProfileController',
                controllerAs: 'vm'
            })
          .when('/logout',
            {
                templateUrl: 'app/views/modules/users/logout.tmpl.html',
                controller: 'logoutController',
                controllerAs: 'vm'
            });
    }
})();
