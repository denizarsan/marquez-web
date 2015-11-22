angular.module('resources.auth', [])

    .factory('AuthAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                login: {
                    method: 'POST',
                    url: apiPath + '/login'
                },
                logout: {
                    method: 'GET',
                    url: apiPath + '/logout'
                }
            });
        }
    ])

    .factory('Auth', [

        '$q',
        'AuthAPI',

        function($q,
                 AuthAPI) {

            var user = null;

            return {
                getUser: function(){
                    return user;
                },

                login: function(username, password) {
                    var deferred = $q.defer(),
                        params = {
                            username: username,
                            password: password
                        };

                    AuthAPI.login(params).$promise
                        .then(
                            function loginSuccess(data) {
                                user = data.user;
                                deferred.resolve(data);
                            }
                        ).catch(
                            function loginFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                logout: function() {
                    var deferred = $q.defer();

                    AuthAPI.logout().$promise
                        .then(
                            function logoutSuccess(data) {
                                user = null;
                                deferred.resolve(data);
                            }
                        ).catch(
                            function logoutFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }
            };

        }
    ]);
