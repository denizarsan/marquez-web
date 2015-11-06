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
