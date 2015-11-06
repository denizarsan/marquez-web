angular.module('marquez-web.performances', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('performances', {
            url: '/performances',
            templateUrl: '/performances/performances.html',
            controller: 'PerformancesController'
        });
    }])

    .controller('PerformancesController', [

        '$scope',
        'Resources',

        function($scope,
                 Resources) {

            $scope.mediaList = [];

            Resources.getVideos().$promise.then(
                function getVideosSuccess(data) {
                    _.each(data.videos, function(video) {
                        $scope.mediaList.push({
                            url: 'http://www.youtube.com/embed/' + video.id,
                            caption: video.caption,
                            thumbnailUrl: 'http://img.youtube.com/vi/' + video.id + '/hqdefault.jpg'
                        });
                    });
                }
            );
        }
    ]);
