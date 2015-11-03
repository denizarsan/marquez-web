angular.module('marquez-web', [

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
        }
    ]);
