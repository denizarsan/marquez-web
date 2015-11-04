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
