(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', '$rootScope', '$cookieStore', '$q', 'base64Service'];

    function userService($http, $rootScope, $cookieStore, $q, base64Service){
        /* jshint validthis: true */
        var scope = this;

        scope.isLogged = false;
        scope.user = {};

        return{
            isLoggedIn: _isLoggedIn,
            name: '',
            getUser: _getUser,
            login: _login,
            isInRole: _isInRole,
            checkLogin: _checkLogin,
            logout: _logout
        };

        function _login(userName, password) {
            var deferred = $q.defer();

            var authdata = base64Service.encode(userName + ':' + password);

            $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line

            $http.get("/api/token/")
                .success(function (data) {
                    $cookieStore.put('localtoken', data.token);
                    $http.defaults.headers.common['Authorization'] = 'Token ' + data.token; // jshint ignore:line

                    scope.isLogged = true;

                    scope.user = data.user;

                    // Notify anyone who is listening that the log in event has happened
                    $rootScope.$broadcast('loggedIn', true);

                    deferred.resolve();
                })
                .error(function(data) {
                    deferred.reject(data.error);
                });

            return deferred.promise;
        }

        function _logout () {
            $cookieStore.remove('localtoken');
            $http.defaults.headers.common['Authorization'] = undefined; // jshint ignore:line

            // Notify anyone who is listening that the log in event has happened
            $rootScope.$broadcast('loggedIn', false);
        }

        function _isInRole(role) {
            role = role.trim();

            scope.user.roles.forEach(function(item){
              if (item.name === role){
                return true;
              }
            });

            return false;
        }

        function _getUser(){
          return scope.user;
        }

        function _isLoggedIn(){
          return scope.isLogged;
        }

        function _checkLogin() {
            if ($cookieStore.get('localtoken')) {
                scope.isLogged = true;

                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('localtoken'); // jshint ignore:line

                return true;
            }

            return false;
        }
    }
})();
