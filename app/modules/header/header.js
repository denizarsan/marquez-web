angular.module('marquez-web.header', [])

    .controller('HeaderController', [function() {

    }])

    .directive('marquezHeader', [

        function() {

            return {
                controller: 'HeaderController',
                templateUrl: 'modules/header/header.html'
            };
        }
    ]);
