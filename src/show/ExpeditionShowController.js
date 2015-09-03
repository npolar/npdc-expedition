'use strict';
/**
 * 
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, $routeParams, Expedition, NpolarApiSecurity) {
  
  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;
  $scope.security = NpolarApiSecurity;  
  $scope.show();
  
};

module.exports = ExpeditionShowController;