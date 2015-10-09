angular.module('marquez-web.gallery', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('gallery', {
            url: '/gallery',
            templateUrl: 'modules/gallery/gallery.html',
            controller: 'GalleryController'
        });
    }])

    .controller('GalleryController', [function() {

    }]);
