angular.module('marquez-web.contact', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('contact', {
            url: '/contact',
            templateUrl: '/contact/contact.html',
            controller: 'ContactController'
        });
    }])

    .controller('ContactController', [

        '$scope',
        'Resources',

        function($scope,
                 Resources) {

            $scope.messageSent = false;
            $scope.messageSuccess = false;

            $scope.message = {};

            $scope.sendMessage = function() {
                Resources.sendMessage($scope.message).$promise.then(
                    function sendMessageSuccess() {
                        $scope.messageSuccess = true;
                    }
                )['catch'](
                    function sendMessageError() {
                        $scope.messageSuccess = false;
                    }
                )['finally'](
                    function sendMessageFinally() {
                        $scope.messageSent = true;
                    }
                );
            };

    }]);
