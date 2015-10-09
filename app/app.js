angular.module('marquez-web', [

    'ui.router',
    'marquez-web.contact',
    'marquez-web.gallery',
    'marquez-web.header',
    'marquez-web.home',
    'marquez-web.performances',
    'marquez-web.recordings'])

    .config([

      '$locationProvider',
      '$urlRouterProvider',

        function($locationProvider,
                 $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
        }
    ]);
