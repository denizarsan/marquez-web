angular.module('marquez-web.performances', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('performances', {
            url: '/performances',
            templateUrl: 'modules/performances/performances.html',
            controller: 'PerformancesController'
        });
    }])

    .controller('PerformancesController', [function() {

    }]);
