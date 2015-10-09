angular.module('marquez-web.view2', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('view2', {
            url: '/view2',
            templateUrl: 'modules/view2/view2.html',
            controller: 'View2Ctrl'
        });
    }])

    .controller('View2Ctrl', [function() {

    }]);
