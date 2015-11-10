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
        'Resources',

        function($scope,
                 Resources) {

            $scope.mediaList = [];

            Resources.getImages().$promise.then(
                function getImagesSuccess(data) {
                    _.each(data.images, function(image) {
                        $scope.mediaList.push({
                            url: image.url,
                            caption: image.caption,
                            thumbnailUrl: image.url
                        });
                    });
                }
            );

        }
    ]);
