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

        function($scope) {

            $scope.getSongUrl = function(embedUrl) {
                var staticUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/',
                    options = '&color=333&show_playcount=false&show_comments=false&show_user=false&show_title=false',
                    trackIdRegex = /api\.soundcloud\.com\/tracks\/(\d*)/,
                    trackId = trackIdRegex.exec(embedUrl)[1];

                return staticUrl + trackId + options;
            };

            $scope.songList = [
                {
                    url: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="' +
                         'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220090922' +
                         '&amp;color=333&amp;show_playcount=false&amp;show_comments=false&amp;show_user=false">' +
                         '</iframe>',
                    title: 'My Fabulous Song 1',
                    caption: 'This is my fabulous song 1'
                },
                {
                    url: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="' +
                         'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220090922' +
                         '&amp;color=333&amp;show_playcount=false&amp;show_comments=false&amp;show_user=false">' +
                         '</iframe>',
                    title: 'My Fabulous Song 2',
                    caption: 'This is my fabulous song 2'
                },
                {
                    url: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="' +
                         'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220090922' +
                         '&amp;color=333&amp;show_playcount=false&amp;show_comments=false&amp;show_user=false">' +
                         '</iframe>',
                    title: 'My Fabulous Song 3',
                    caption: 'This is my fabulous song 3'
                },
                {
                    url: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="' +
                         'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220090922' +
                         '&amp;color=333&amp;show_playcount=false&amp;show_comments=false&amp;show_user=false">' +
                         '</iframe>',
                    title: 'My Fabulous Song 4',
                    caption: 'This is my fabulous song 4'
                },
                {
                    url: '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="' +
                         'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/220090922' +
                         '&amp;color=333&amp;show_playcount=false&amp;show_comments=false&amp;show_user=false">' +
                         '</iframe>',
                    title: 'My Fabulous Song 5',
                    caption: 'This is my fabulous song 5'
                }
            ];
        }
      ]);
