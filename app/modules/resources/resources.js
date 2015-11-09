angular.module('marquez-web')

    .factory('Resources', [

        '$resource',

        function($resource) {
            var apiPath = '/api';
            return $resource(apiPath, {}, {
                getSongs: {
                    method: 'GET',
                    url: apiPath + '/songs'
                },
                getVideos: {
                    method: 'GET',
                    url: apiPath + '/videos'
                },
                getImages: {
                    method: 'GET',
                    url: apiPath + '/images'
                }
            });
        }
    ]);
