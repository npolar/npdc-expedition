'use strict';

// @ngInject

var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'ExpeditionShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'ExpeditionEditController'
  }).when('/', {
    template: '<npdc:search-input feed="feed"></npdc:search-input><npdc:search feed="feed"></npdc:search>',
    controller: 'ExpeditionSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
