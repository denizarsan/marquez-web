angular.module('resources.public', [])

    .factory('PublicAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                sendMessage: {
                    method: 'POST',
                    url: apiPath + '/message'
                },
                getPerformances: {
                    method: 'GET',
                    url: apiPath + '/performances'
                },
                getPhotos: {
                    method: 'GET',
                    url: apiPath + '/photos'
                },
                getRecordings: {
                    method: 'GET',
                    url: apiPath + '/recordings'
                }
            });
        }
    ])

    .factory('Public', [

        '$q',
        'PublicAPI',

        function($q,
                 PublicAPI) {

            return {

                sendMessage: function(message) {
                    var deferred = $q.defer();

                    PublicAPI.sendMessage(message).$promise
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
                },

                getPerformances: function() {
                    var deferred = $q.defer();

                    PublicAPI.getPerformances().$promise
                        .then(
                            function getPerformancesSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function getPerformancesFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getPhotos: function() {
                    var deferred = $q.defer();

                    PublicAPI.getPhotos().$promise
                        .then(
                            function getPhotosSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function getPhotosFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getRecordings: function() {
                    var deferred = $q.defer();

                    PublicAPI.getRecordings().$promise
                        .then(
                            function getRecordingsSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function getRecordingsFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };

        }
    ]);
