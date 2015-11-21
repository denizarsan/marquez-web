angular.module('marquez-web.admin', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('admin', {
            url: '/admin',
            templateUrl: '/admin/admin.html',
            controller: 'AdminController'
        });
    }])

    .controller('AdminController', [

        '$scope',
        'Auth',

        function($scope,
                 Auth) {

            $scope.user = Auth.getUser();
            $scope.loginForm = {};

            $scope.login = function () {
                Auth.login($scope.loginForm.username, $scope.loginForm.password)
                    .then(
                        function loginSuccess() {
                            $scope.error = null;
                        }
                    ).catch(
                        function loginFailure() {
                            $scope.error = 'Invalid username/password';
                        }
                    ).finally(
                        function loginFinally() {
                            $scope.user = Auth.getUser();
                        }
                    );
            };

            $scope.logout = function () {
                Auth.logout()
                    .finally(
                        function logoutFinally() {
                            $scope.user = Auth.getUser();
                        }
                    );
            };
        }
    ]);
