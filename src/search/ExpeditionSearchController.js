'use strict';
var angular = require('angular');
/**
 * @ngInject
 */
var ExpeditionSearchController = function ($scope, $location, $controller, Expedition) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Expedition;
    
  let query = function() {
    
    let defaults = { limit: "all", sort: "-updated", fields: 'title,id,updated' };
    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    
    return angular.extend(defaults, $location.search(), invariants);
  };

  $scope.search(query());

};

module.exports = ExpeditionSearchController;
