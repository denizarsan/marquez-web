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
        'Performances',

        function($scope,
                 Performances) {

            $scope.mediaList = [];

            Performances.list()
                .then(
                    function listPerformancesSuccess(data) {
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
