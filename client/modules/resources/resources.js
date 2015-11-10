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
                getPerformances: {
                    method: 'GET',
                    url: apiPath + '/performances'
                },
                getPhotos: {
                    method: 'GET',
                    url: apiPath + '/photos'
                }
            });
        }
    ]);
