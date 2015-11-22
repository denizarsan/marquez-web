angular.module('resources.admin', [])

    .factory('AdminAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api/admin';

            return $resource(apiPath, {}, {
                deleteMessage: {
                    method: 'DELETE',
                    url: apiPath + '/message/:id'
                },
                getMessages: {
                    method: 'GET',
                    url: apiPath + '/messages'
                },
                addPerformance: {
                    method: 'POST',
                    url: apiPath + '/performance'
                },
                deletePerformance: {
                    method: 'DELETE',
                    url: apiPath + '/performance/:id'
                },
                updatePerformance: {
                    method: 'PUT',
                    url: apiPath + '/performance/:id'
                },
                getPerformances: {
                    method: 'GET',
                    url: apiPath + '/performances'
                },
                addPhoto: {
                    method: 'POST',
                    url: apiPath + '/photo'
                },
                deletePhoto: {
                    method: 'DELETE',
                    url: apiPath + '/photo/:id'
                },
                updatePhoto: {
                    method: 'PUT',
                    url: apiPath + '/photo/:id'
                },
                getPhotos: {
                    method: 'GET',
                    url: apiPath + '/photos'
                },
                addRecording: {
                    method: 'POST',
                    url: apiPath + '/recording'
                },
                deleteRecording: {
                    method: 'DELETE',
                    url: apiPath + '/recording/:id'
                },
                updateRecording: {
                    method: 'PUT',
                    url: apiPath + '/recording/:id'
                },
                getRecordings: {
                    method: 'GET',
                    url: apiPath + '/recordings'
                },
                addUser: {
                    method: 'POST',
                    url: apiPath + '/user'
                },
                deleteUser: {
                    method: 'DELETE',
                    url: apiPath + '/user/:id'
                },
                getUsers: {
                    method: 'GET',
                    url: apiPath + '/users'
                }
            });
        }
    ])

    .factory('Admin', [

        '$q',
        'AdminAPI',

        function($q,
                 AdminAPI) {

            return {
                deleteMessage: function(id) {
                    var deferred = $q.defer(),
                        params = {
                            id: id
                        };

                    AdminAPI.deleteMessage(params).$promise
                        .then(
                            function deleteMessageSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function deleteMessageFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getMessages: function() {
                    var deferred = $q.defer();

                    AdminAPI.getMessages().$promise
                        .then(
                            function getMessagesSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function getMessagesFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                addPerformance: function(videoId, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            videoId: videoId,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.addPerformance(params).$promise
                        .then(
                            function addPerformanceSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function addPerformanceFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                deletePerformance: function(id) {
                    var deferred = $q.defer(),
                        params = {
                            id: id
                        };

                    AdminAPI.deletePerformance(params).$promise
                        .then(
                            function deletePerformanceSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function deletePerformanceFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                updatePerformance: function(id, videoId, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            id: id,
                            videoId: videoId,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.updatePerformance(params).$promise
                        .then(
                            function updatePerformanceSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function updatePerformanceFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getPerformances: function() {
                    var deferred = $q.defer();

                    AdminAPI.getPerformances().$promise
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

                addPhoto: function(url, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            url: url,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.addPhoto(params).$promise
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
                },

                deletePhoto: function(id) {
                    var deferred = $q.defer(),
                        params = {
                            id: id
                        };

                    AdminAPI.deletePhoto(params).$promise
                        .then(
                            function deletePhotoSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function deletePhotoFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                updatePhoto: function(id, url, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            id: id,
                            url: url,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.updatePhoto(params).$promise
                        .then(
                            function updatePhotoSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function updatePhotoFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getPhotos: function() {
                    var deferred = $q.defer();

                    AdminAPI.getPhotos().$promise
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

                addRecording: function(url, title, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            url: url,
                            title: title,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.addRecording(params).$promise
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
                },

                deleteRecording: function(id) {
                    var deferred = $q.defer(),
                        params = {
                            id: id
                        };

                    AdminAPI.deleteRecording(params).$promise
                        .then(
                            function deleteRecordingSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function deleteRecordingFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                updateRecording: function(id, url, title, caption, isPrivate) {
                    var deferred = $q.defer(),
                        params = {
                            id: id,
                            url: url,
                            title: title,
                            caption: caption,
                            isPrivate: isPrivate
                        };

                    AdminAPI.updateRecording(params).$promise
                        .then(
                            function updateRecordingSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function updateRecordingFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getRecordings: function() {
                    var deferred = $q.defer();

                    AdminAPI.getRecordings().$promise
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
                },

                addUser: function(username, password) {
                    var deferred = $q.defer(),
                        params = {
                            username: username,
                            password: password
                        };

                    AdminAPI.addUser(params).$promise
                        .then(
                            function addUserSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function addUserFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                deleteUser: function(id) {
                    var deferred = $q.defer(),
                        params = {
                            id: id
                        };

                    AdminAPI.deleteUser(params).$promise
                        .then(
                            function deleteUserSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function deleteUserFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                getUsers: function() {
                    var deferred = $q.defer();

                    AdminAPI.getUsers().$promise
                        .then(
                            function getUsersSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function getUsersFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };

        }
    ]);
