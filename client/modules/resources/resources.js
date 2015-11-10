angular.module('marquez-web')

    .factory('Resources', [

        '$resource',

        function($resource) {
            var apiPath = '/api';
            return $resource(apiPath, {}, {
                getRecordings: {
                    method: 'GET',
                    url: apiPath + '/recordings'
                },
                addRecording: {
                    method: 'POST',
                    url: apiPath + '/recording'
                },
                getPerformances: {
                    method: 'GET',
                    url: apiPath + '/performances'
                },
                addPerformance: {
                    method: 'POST',
                    url: apiPath + '/performance'
                },
                getPhotos: {
                    method: 'GET',
                    url: apiPath + '/photos'
                },
                addPhoto: {
                    method: 'POST',
                    url: apiPath + '/photo'
                },
                getMessages: {
                    method: 'GET',
                    url: apiPath + '/messages'
                },
                sendMessage: {
                    method: 'POST',
                    url: apiPath + '/message'
                }
            });
        }
    ]);
