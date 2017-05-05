'use strict';
/**
 *
 *
 * @ngInject
 */
var StatCSVController = function ($scope, $controller, Expedition, ExpeditionJSONService) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;

  $scope.entries = ExpeditionJSONService.entryObject;
  console.log($scope.entries);

};


module.exports = StatCSVController;


