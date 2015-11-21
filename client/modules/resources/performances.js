angular.module('resources.performances', [])

    .factory('PerformancesAPI', [

        '$resource',

        function($resource) {

            var apiPath = '/api';

            return $resource(apiPath, {}, {
                list: {
                    method: 'GET',
                    cache: true,
                    url: apiPath + '/performances'
                },
                add: {
                    method: 'POST',
                    url: apiPath + '/performance'
                }
            });
        }
    ])

    .factory('Performances', [

        '$q',
        'PerformancesAPI',

        function($q,
                 PerformancesAPI) {

            return {
                list: function() {
                    var deferred = $q.defer();

                    PerformancesAPI.list().$promise
                        .then(
                            function listPerformancesSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function listPerformancesFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                },

                add: function(url, caption) {
                    var deferred = $q.defer(),
                        params = {
                            url: url,
                            caption: caption
                        };

                    PerformancesAPI.add(params).$promise
                        .then(
                            function addPerformanceSuccess(data) {
                                deferred.resolve(data);
                            }
                        ).catch(
                            function addPerformanceFailure(error) {
                                deferred.reject(error);
                            }
                        );

                    return deferred.promise;
                }

            };
        }
    ]);
