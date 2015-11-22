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
        'Public',

        function($scope,
                 Public) {

            $scope.mediaList = [];

            Public.getPerformances()
                .then(
                    function getPerformancesSuccess(data) {
                        _.each(data.performances, function(performance) {
                            $scope.mediaList.push({
                                url: 'http://www.youtube.com/embed/' + performance.videoId,
                                caption: performance.caption,
                                thumbnailUrl: 'http://img.youtube.com/vi/' + performance.videoId + '/hqdefault.jpg'
                            });
                        });
                    }
                );
        }
    ]);
