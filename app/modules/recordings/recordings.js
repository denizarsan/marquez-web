angular.module('marquez-web.recordings', [])

    .config(['$stateProvider', function($stateProvider) {
        $stateProvider.state('recordings', {
            url: '/recordings',
            templateUrl: '/recordings/recordings.html',
            controller: 'RecordingsController'
        });
    }])

    .controller('RecordingsController', [function() {

    }]);
