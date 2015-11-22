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
        'Public',

        function($scope,
                 Public) {

            $scope.mediaList = [];

            Public.getPhotos()
                .then(
                    function getPhotosSuccess(data) {
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
