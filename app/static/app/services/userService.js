(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', userService);

    userService.$inject = ['$http', '$resource', '$rootScope', '$cookieStore', '$q'];

    function userService($http, $resource, $rootScope, $cookieStore, $q)
    {
        var scope = this;

        scope.isLogged = true;
        scope.userName = '';
        scope.userRoles = [];
        scope.userId = 0;

        return{
            isLogged: scope.isLogged,
            username: scope.userName,
            name: '',
            userId: scope.userId,
            login: login,
            isInRole: isInRole,
            checkLogin: checkLogin,
            logout: logout
        };

        function login(userName, password) {
            var deferred = $q.defer();

            var user_data = {
                "username": userName,
                "password": password,
            };

            setTimeout(function() {
                //$cookieStore.put('djangotoken', data.token);
                //$http.defaults.headers.common['Authorization'] = 'Token ' + data.token;

                scope.isLogged = true;

                // Notify anyone who is listening that the log in event has happened
                $rootScope.$broadcast('loggedIn', true);

                deferred.resolve();
              }, 1000);


            /*$http.post("api-token-auth/", user_data)
                .success(function (data) {
                    $cookieStore.put('djangotoken', data.token);
                    $http.defaults.headers.common['Authorization'] = 'Token ' + data.token;

                    scope.isLogged = true;

                    // Notify anyone who is listening that the log in event has happened
                    $rootScope.$broadcast('loggedIn', true);

                    deferred.resolve();
                })
                .catch(function (data) {
                    deferred.reject(error.data.error);
                });*/

            return deferred.promise;
        };

        function logout () {
            $cookieStore.remove('djangotoken');
            $http.defaults.headers.common['Authorization'] = undefined;

            // Notify anyone who is listening that the log in event has happened
            $rootScope.$broadcast('loggedIn', false);
        };

        function isInRole(role) {
            role = role.trim();
            return true;
        };

        function checkLogin() {
            /*if ($cookieStore.get('djangotoken')) {
                this.isLogged = true;

                $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');

                return true;
            }

            return false;*/
            return true;
        };
    };
})();
