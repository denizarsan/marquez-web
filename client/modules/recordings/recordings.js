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
        'Public',

        function($scope,
                 Public) {

            $scope.getRecordingUrl = function(embedUrl) {
                var staticUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/',
                    options = '&color=333&show_playcount=false&show_comments=false&show_user=false&show_title=false',
                    trackIdRegex = /api\.soundcloud\.com\/tracks\/(\d*)/,
                    trackId = trackIdRegex.exec(embedUrl)[1];

                return staticUrl + trackId + options;
            };

            $scope.recordingList = [];
            Public.getRecordings()
                .then(
                    function getRecordingsSuccess(data) {
                        _.each(data.recordings, function(recording) {
                            $scope.recordingList.push({
                                url: $scope.getRecordingUrl(recording.url),
                                title: recording.title,
                                caption: recording.caption
                            });
                        });
                    }
                );

        }
    ]);
