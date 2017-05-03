'use strict';

// @ngInject

var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/stat', {
    templateUrl: 'show/stat.html',
    controller: 'StatShowController'
  }).when('/map', {
    templateUrl: 'show/map.html',
    controller: 'MapShowController'
  }).when('/stat/csv', {
    templateUrl: 'show/csv.html',
    controller: 'StatCSVController'
  }).when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'ExpeditionShowController'
  }).when(':id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'ExpeditionEditController'
  }).when('/', {
    templateUrl: 'search/search.html',
    controller: 'ExpeditionSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;