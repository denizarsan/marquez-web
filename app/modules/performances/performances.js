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

        function($scope) {
            $scope.mediaList = [
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 1'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 2'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 3'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 4'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 5'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 6'
                },
                {
                    url: 'http://www.youtube.com/embed/M7lc1UVf-VE',
                    thumbnailUrl: 'http://img.youtube.com/vi/M7lc1UVf-VE/hqdefault.jpg',
                    caption: 'My awesome performance 7'
                }
            ];
        }
    ]);
