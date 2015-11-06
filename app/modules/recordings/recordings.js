angular.module('marquez-web.recordings', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('recordings', {
            url: '/recordings',
            templateUrl: '/recordings/recordings.html',
            controller: 'RecordingsController'
        });
    }])

    .controller('RecordingsController', [

        '$scope',
        'Resources',

        function($scope,
                 Resources) {

            $scope.getSongUrl = function(embedUrl) {
                var staticUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/',
                    options = '&color=333&show_playcount=false&show_comments=false&show_user=false&show_title=false',
                    trackIdRegex = /api\.soundcloud\.com\/tracks\/(\d*)/,
                    trackId = trackIdRegex.exec(embedUrl)[1];

                return staticUrl + trackId + options;
            };

            $scope.songList = [];
            Resources.getSongs().$promise.then(
                function getSongsSuccess(data) {
                    _.each(data.songs, function(song) {
                        $scope.songList.push({
                            url: $scope.getSongUrl(song.url),
                            title: song.title,
                            caption: song.caption
                        });
                    });
                }
            );

        }
    ]);
