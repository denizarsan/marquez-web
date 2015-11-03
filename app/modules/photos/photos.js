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
                    caption: 'My Pet Bear 1'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 2'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 3'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 4'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 5'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 6'
                },
                {
                    url: 'http://placebear.com/1280/768',
                    thumbnailUrl: 'http://placebear.com/300/300',
                    caption: 'My Pet Bear 7'
                }
            ];
        }
    ]);
