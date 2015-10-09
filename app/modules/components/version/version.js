angular.module('marquez-web.version', [

  'marquez-web.version.interpolate-filter',
  'marquez-web.version.version-directive'

])

    .value('version', '0.1');
