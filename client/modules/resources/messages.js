angular.module('resources.messages', [])

    .factory('MessagesAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                list: {
                    method: 'GET',
                    cache: true,
                    url: apiPath + '/messages'
                },
                send: {
                    method: 'POST',
                    url: apiPath + '/message'
                }
            });
        }
    ])

    .factory('Messages', [

        '$q',
        'MessagesAPI',

        function($q,
                 MessagesAPI) {

            return {
                list: function() {
                    var deferred = $q.defer();

                    MessagesAPI.list().$promise
                        .then(
                            function listMessagesSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function listMessagesFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                send: function(name, email, body) {
                    var deferred = $q.defer(),
                        params = {
                            name: name,
                            email: email,
                            body: body
                        };

                    MessagesAPI.send(params).$promise
                        .then(
                            function sendMessageSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function sendMessageFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };
        }
    ]);
