angular.module('marquez-web.view1', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('view1', {
            url: '/view1',
            templateUrl: 'modules/view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', [function() {

    }]);
