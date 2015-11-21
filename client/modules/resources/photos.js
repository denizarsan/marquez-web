angular.module('resources.photos', [])

    .factory('PhotosAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                list: {
                    method: 'GET',
                    cache: true,
                    url: apiPath + '/photos'
                },
                add: {
                    method: 'POST',
                    url: apiPath + '/photo'
                }
            });
        }
    ])

    .factory('Photos', [

        '$q',
        'PhotosAPI',

        function($q,
                 PhotosAPI) {

            return {
                list: function() {
                    var deferred = $q.defer();

                    PhotosAPI.list().$promise
                        .then(
                            function listPhotosSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function listPhotosFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                add: function(url, caption) {
                    var deferred = $q.defer(),
                        params = {
                            url: url,
                            caption: caption
                        };

                    PhotosAPI.add(params).$promise
                        .then(
                            function addPhotoSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function addPhotoFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };
        }
    ]);
