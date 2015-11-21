angular.module('resources.recordings', [])

    .factory('RecordingsAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                list: {
                    method: 'GET',
                    cache: true,
                    url: apiPath + '/recordings'
                },
                add: {
                    method: 'POST',
                    url: apiPath + '/recording'
                }
            });
        }
    ])

    .factory('Recordings', [

        '$q',
        'RecordingsAPI',

        function($q,
                 RecordingsAPI) {

            return {
                list: function() {
                    var deferred = $q.defer();

                    RecordingsAPI.list().$promise
                        .then(
                            function listRecordingsSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function listRecordingsFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                add: function(title, caption, url) {
                    var deferred = $q.defer(),
                        params = {
                            title: title,
                            caption: caption,
                            url: url
                        };

                    RecordingsAPI.add(params).$promise
                        .then(
                            function addRecordingSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function addRecordingFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };
        }
    ]);
