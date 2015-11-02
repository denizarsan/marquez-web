angular.module('marquez-web.gallery', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('gallery', {
            url: '/gallery',
            templateUrl: '/gallery/gallery.html',
            controller: 'GalleryController'
        });
    }])

    .controller('GalleryController', [function() {

    }]);
