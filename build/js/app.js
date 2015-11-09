angular.module('marquez-web', [

    'ngResource',
    'ui.router',
    'marquez-web.components',
    'marquez-web.contact',
    'marquez-web.header',
    'marquez-web.home',
    'marquez-web.performances',
    'marquez-web.photos',
    'marquez-web.recordings'])

    .config([

      '$locationProvider',
      '$urlRouterProvider',

        function($locationProvider,
                 $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        }
    ]);

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

angular.module('marquez-web.contact', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/contact/contact.html',
            controller: 'ContactController'
        });
    }])

    .controller('ContactController', [function() {

    }]);

angular.module('marquez-web.header', [])

    .controller('HeaderController', [

        '$scope',

        function($scope) {

            $scope.showMenu = false;

            $scope.toggleMenu = function() {
                $scope.showMenu = !$scope.showMenu;
            };

        }
    ])

    .directive('marquezHeader', [

        function() {

            return {
                controller: 'HeaderController',
                templateUrl: '/header/header.html'
            };
        }
    ]);

angular.module('marquez-web.home', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: '/home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [function() {

    }]);

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
        'Resources',

        function($scope,
                 Resources) {

            $scope.mediaList = [];

            Resources.getVideos().$promise.then(
                function getVideosSuccess(data) {
                    _.each(data.videos, function(video) {
                        $scope.mediaList.push({
                            url: 'http://www.youtube.com/embed/' + video.id,
                            caption: video.caption,
                            thumbnailUrl: 'http://img.youtube.com/vi/' + video.id + '/hqdefault.jpg'
                        });
                    });
                }
            );
        }
    ]);

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

angular.module('marquez-web.recordings', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('recordings', {
            url: '/recordings',
            templateUrl: '/recordings/recordings.html',
            controller: 'RecordingsController'
        });
    }])

    .controller('RecordingsController', [

        '$scope',
        'Resources',

        function($scope,
                 Resources) {

            $scope.getSongUrl = function(embedUrl) {
                var staticUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/',
                    options = '&color=333&show_playcount=false&show_comments=false&show_user=false&show_title=false',
                    trackIdRegex = /api\.soundcloud\.com\/tracks\/(\d*)/,
                    trackId = trackIdRegex.exec(embedUrl)[1];

                return staticUrl + trackId + options;
            };

            $scope.songList = [];
            Resources.getSongs().$promise.then(
                function getSongsSuccess(data) {
                    _.each(data.songs, function(song) {
                        $scope.songList.push({
                            url: $scope.getSongUrl(song.url),
                            title: song.title,
                            caption: song.caption
                        });
                    });
                }
            );

        }
    ]);

angular.module('marquez-web')

    .factory('Resources', [

        '$resource',

        function($resource) {
            var apiPath = '/api';
            return $resource(apiPath, {}, {
                getSongs: {
                    method: 'GET',
                    url: apiPath + '/songs'
                },
                getVideos: {
                    method: 'GET',
                    url: apiPath + '/videos'
                },
                getImages: {
                    method: 'GET',
                    url: apiPath + '/images'
                }
            });
        }
    ]);

angular.module('marquez-web').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('/components/media-gallery.html',
    "<div class=MediaGallery><div class=MediaGallery-spotlight><div class=MediaGallery-navigations><div class=MediaGallery-leftNavigation ng-click=previous()><span class=\"glyphicon glyphicon-chevron-left\"></span></div><div class=MediaGallery-rightNavigation ng-click=next()><span class=\"glyphicon glyphicon-chevron-right\"></span></div></div><div class=MediaGallery-imageWrapper ng-if=\"type === 'image'\"><img class=MediaGallery-image ng-src=\"{{ currentMedia.url }}\"></div><div class=MediaGallery-videoWrapper ng-if=\"type === 'video'\"><iframe class=MediaGallery-video id=ytplayer type=text/html ng-src=\"{{ currentMedia.url | trustAsResourceUrl }}\"></iframe></div><div class=MediaGallery-caption>{{ currentMedia.caption }}</div></div><div class=MediaGallery-thumbnails><div class=MediaGallery-thumbnail ng-repeat=\"media in mediaList\" ng-click=show($index) ng-class=\"{ 'MediaGallery-thumbnail--selected': media === currentMedia }\"><div class=MediaGallery-thumbnailImageWrapper><div class=MediaGallery-thumbnailImage ng-style=\"{ 'background-image': 'url(' + media.thumbnailUrl + ')' }\" title=\"{{ media.caption }}\"></div></div></div></div></div>"
  );


  $templateCache.put('/contact/contact.html',
    "<div class=Contact><div class=Contact-hero><div class=Contact-heroCopy></div></div><div class=Contact-contents><div class=ContactInformation><h3 class=Contact-title>Contact Me</h3><a class=ContactInformation-link href=http://www.facebook.com/cinar.atilla><div class=\"ContactInformation-icon ContactInformation-icon--facebook\"></div><div class=ContactInformation-text>Çınar Atilla</div></a> <a class=ContactInformation-link href=mailto:cinar_atilla@hotmail.com><div class=\"ContactInformation-icon ContactInformation-icon--email\"></div><div class=ContactInformation-text>cinar_atilla@hotmail.com</div></a> <a class=ContactInformation-link href=tel:+905322117938><div class=\"ContactInformation-icon ContactInformation-icon--phone\"></div><div class=ContactInformation-text>+90 532-211-7938</div></a></div><form class=ContactForm><h3 class=Contact-title>Send a Message</h3><div class=ContactForm-section><div class=\"ContactForm-field ContactForm-field--half\"><label class=ContactForm-label for=name>Name</label><input class=ContactForm-input id=name placeholder=Name></div><div class=\"ContactForm-field ContactForm-field--half\"><label class=ContactForm-label for=email>Email</label><input type=email class=ContactForm-input id=email placeholder=Email></div></div><div class=ContactForm-section><div class=ContactForm-field><label class=ContactForm-label for=message>Message</label><textarea class=ContactForm-textarea name=message rows=5></textarea></div></div><div class=ContactForm-section><button type=submit class=\"ContactForm-button btn\">Submit</button></div></form></div></div>"
  );


  $templateCache.put('/header/header.html',
    "<div class=Header><div class=Header-contents><div class=Header-brand>Çınar Atilla</div><div class=Header-navigations><div class=Header-navigation><a class=Header-link ui-sref-active=active ui-sref=home>Home</a></div><div class=Header-navigation><a class=Header-link ui-sref-active=active ui-sref=performances>Performances</a></div><div class=Header-navigation><a class=Header-link ui-sref-active=active ui-sref=recordings>Recordings</a></div><div class=Header-navigation><a class=Header-link ui-sref-active=active ui-sref=photos>Photos</a></div><div class=Header-navigation><a class=Header-link ui-sref-active=active ui-sref=contact>Contact</a></div></div><div class=Header-toggle><button type=button class=Header-button ng-click=toggleMenu()><span class=\"Header-buttonIcon glyphicon glyphicon-menu-hamburger\"></span></button></div><div class=Header-menu ng-if=showMenu><ul class=Header-menuList><li class=Header-menuItem ui-sref-active=active><a class=Header-menuLink ng-click=toggleMenu() ui-sref=home>Home</a></li><li class=Header-menuItem ui-sref-active=active><a class=Header-menuLink ng-click=toggleMenu() ui-sref=performances>Performances</a></li><li class=Header-menuItem ui-sref-active=active><a class=Header-menuLink ng-click=toggleMenu() ui-sref=recordings>Recordings</a></li><li class=Header-menuItem ui-sref-active=active><a class=Header-menuLink ng-click=toggleMenu() ui-sref=photos>Photos</a></li><li class=Header-menuItem ui-sref-active=active><a class=Header-menuLink ng-click=toggleMenu() ui-sref=contact>Contact</a></li></ul></div></div></div>"
  );


  $templateCache.put('/home/home.html',
    "<div class=Home><div class=Home-hero><div class=Home-heroCopy><div class=Home-heroTitle>I'm Awesome.</div><div class=Home-heroSubtitle>Just sayin'</div></div></div><div class=Home-about><div class=Home-portrait><img class=Home-portraitImage src=\"/images/home-portrait.png\"></div><div class=Home-text><h3 class=Home-title>A Little About Me</h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum sagittis libero at lacinia. Pellentesque quis diam consequat, dignissim tellus vel, blandit arcu. Nam blandit tortor non nibh ornare, ut gravida est finibus. Cras molestie arcu eget ex varius, eget consequat nibh consequat. Integer non velit laoreet, varius augue non, ultrices est. Ut in arcu eget eros aliquet pharetra id sit amet odio. Morbi cursus nisl at laoreet lacinia. Nulla pulvinar nunc urna, quis sollicitudin erat congue in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur mollis erat non cursus porttitor.</div></div></div>"
  );


  $templateCache.put('/performances/performances.html',
    "<div class=Performances ng-if=mediaList.length><div media-gallery type=video media-list=mediaList></div></div>"
  );


  $templateCache.put('/photos/photos.html',
    "<div class=Photo ng-if=mediaList.length><div media-gallery type=image media-list=mediaList></div></div>"
  );


  $templateCache.put('/recordings/recordings.html',
    "<div class=Recordings><div class=Recording ng-repeat=\"song in songList\"><h3 class=Recording-title>{{ song.title }}</h3><div class=Recording-embedWrapper><iframe width=100% height=166 scrolling=no frameborder=no ng-src=\"{{ getSongUrl(song.url) | trustAsResourceUrl }}\"></iframe></div><div class=Recording-caption>{{ song.caption }}</div></div></div>"
  );

}]);
