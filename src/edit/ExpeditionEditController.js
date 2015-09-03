'use strict';

/**
 * @ngInject
 */
var ExpeditionEditController = function ($scope, $controller, $routeParams, Expedition) {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Expedition -> npolarApiResource -> ngResource
  $scope.resource = Expedition;

  // Formula ($scope.formula is set by parent)
  $scope.formula.schema = '//api.npolar.no/schema/expedition';
  //$scope.formula.form = 'edit/formula.json';
  
  // edit (or new) action
  $scope.edit();

};

module.exports = ExpeditionEditController;
