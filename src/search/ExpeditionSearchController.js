'use strict';
var angular = require('angular');
/**
 * @ngInject
 */
var ExpeditionSearchController = function ($scope, $location, $controller, Expedition, npdcAppConfig) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Expedition;

  let query = function() {

    let defaults = { limit: "all", sort: "-updated", fields: 'code,id,updated,type' };
    let invariants = $scope.security.isAuthenticated() ? {} : {} ;

    return angular.extend(defaults, $location.search(), invariants);
  };

  npdcAppConfig.cardTitle = "Expedition Archive";
  $scope.search(query());

  npdcAppConfig.search.local.results = {
    subtitle: "type"
  };

};

module.exports = ExpeditionSearchController;
