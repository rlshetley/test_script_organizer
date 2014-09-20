tsoApp.factory('userService', function ($http, $resource, $rootScope, $cookieStore, $q)
{
    this.isLogged = false;
    this.userName = '';
    this.userRoles = [];
    this.userId = 0;

    return{
        isLogged: this.isLogged,
        username: this.userName,
        userId: this.userId,
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

        $http.post("api-token-auth/", user_data)
            .success(function (data) {
                $cookieStore.put('djangotoken', data.token);
                $http.defaults.headers.common['Authorization'] = 'Token ' + data.token;

                isLogged = true;

                // Notify anyone who is listening that the log in event has happened
                $rootScope.$broadcast('loggedIn', true);

                deferred.resolve();
            })
            .catch(function (data) {
                deferred.reject(error.data.error);
            });

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
        return _.some(userRoles, function (item) {
            if (_.isString(item.Name)) {
                return item.Name.trim() === role;
            }
        });
    };

    function checkLogin() {
        if ($cookieStore.get('djangotoken')) {
            isLogged = true;

            $http.defaults.headers.common['Authorization'] = 'Token ' + $cookieStore.get('djangotoken');

            return true;
        }

        return false;
    };
});