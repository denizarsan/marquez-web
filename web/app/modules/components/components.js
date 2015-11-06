angular.module('marquez-web.components', [])

    .directive('mediaGallery', [

        function() {

            return {
                scope: {
                    type: '@',
                    mediaList: '='
                },
                controller: 'MediaGalleryController',
                templateUrl: '/components/media-gallery.html'
            };
        }
    ])

    .controller('MediaGalleryController', [

        '$scope',

        function($scope) {

            $scope.next = function() {
                if ($scope.currentIndex < $scope.mediaList.length - 1) {
                    $scope.show($scope.currentIndex + 1);
                } else {
                    $scope.show(0);
                }

            };

            $scope.previous = function() {
                if ($scope.currentIndex > 0) {
                    $scope.show($scope.currentIndex - 1);
                } else {
                    $scope.show($scope.mediaList.length - 1);
                }

            };

            $scope.show = function(index) {
                $scope.currentIndex = index;
                $scope.currentMedia = $scope.mediaList[$scope.currentIndex];
            };

            $scope.show(0);

        }
    ])

    .filter('trustAsResourceUrl', [

        '$sce',

        function($sce) {
            return function(val) {
                return $sce.trustAsResourceUrl(val);
            };
        }
    ]);
