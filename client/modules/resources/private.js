angular.module('resources.private', [])

    .factory('PrivateAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api/private';

            return $resource(apiPath, {}, {
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

    .factory('Private', [

        '$q',
        'PrivateAPI',

        function($q,
                 PrivateAPI) {

            return {

                getPerformances: function() {
                    var deferred = $q.defer();

                    PrivateAPI.getPerformances().$promise
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

                    PrivateAPI.getPhotos().$promise
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

                    PrivateAPI.getRecordings().$promise
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
