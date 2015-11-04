angular.module('marquez-web.photos', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('photos', {
            url: '/photos',
            templateUrl: '/photos/photos.html',
            controller: 'PhotosController'
        });
    }])

    .controller('PhotosController', [

        '$scope',

        function($scope) {
            $scope.mediaList = [
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 1'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 2'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 3'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 4'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 5'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 6'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My awesome photo 7'
                }
            ];
        }
    ]);
