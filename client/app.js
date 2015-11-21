angular.module('marquez-web', [

    'ngResource',
    'ui.router',
    'marquez-web.admin',
    'marquez-web.components',
    'marquez-web.contact',
    'marquez-web.header',
    'marquez-web.home',
    'marquez-web.performances',
    'marquez-web.photos',
    'marquez-web.recordings',
    'marquez-web.resources'])

    .config([

      '$locationProvider',
      '$urlRouterProvider',

        function($locationProvider,
                 $urlRouterProvider) {

            $urlRouterProvider.otherwise('/');
            $locationProvider.html5Mode(true);
        }
    ]);
