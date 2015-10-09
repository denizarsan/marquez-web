angular.module('marquez-web', [

    'ui.router',
    'marquez-web.view1',
    'marquez-web.view2',
    'marquez-web.version'])

    .config([

      '$locationProvider',
      '$urlRouterProvider',

        function($locationProvider,
                 $urlRouterProvider) {

            $urlRouterProvider.otherwise('/view1');
        }
    ]);
