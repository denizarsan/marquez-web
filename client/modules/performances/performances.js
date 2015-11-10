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

            Resources.getPerformances().$promise.then(
                function getPerformancesSuccess(data) {
                    _.each(data.performances, function(performance) {
                        $scope.mediaList.push({
                            url: 'http://www.youtube.com/embed/' + performance.id,
                            caption: performance.caption,
                            thumbnailUrl: 'http://img.youtube.com/vi/' + performance.id + '/hqdefault.jpg'
                        });
                    });
                }
            );
        }
    ]);
