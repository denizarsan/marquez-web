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
        'Public',

        function($scope,
                 Public) {

            $scope.messageSent = false;
            $scope.messageSuccess = false;

            $scope.message = {};

            $scope.sendMessage = function() {
                Public.sendMessage($scope.message)
                    .then(
                        function sendMessageSuccess() {
                            $scope.messageSuccess = true;
                        }
                    ).catch(
                        function sendMessageError() {
                            $scope.messageSuccess = false;
                        }
                    ).finally(
                        function sendMessageFinally() {
                            $scope.messageSent = true;
                        }
                    );
            };

    }]);
