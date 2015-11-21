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
        'Photos',

        function($scope,
                 Photos) {

            $scope.mediaList = [];

            Photos.list()
                .then(
                    function listPhotosSuccess(data) {
                        _.each(data.photos, function(photo) {
                            $scope.mediaList.push({
                                url: photo.url,
                                caption: photo.caption,
                                thumbnailUrl: photo.url
                            });
                        });
                    }
                );

        }
    ]);
