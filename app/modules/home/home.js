angular.module('marquez-web.home', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'modules/home/home.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', [function() {

    }]);
