'use strict';
/**
 *
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, Expedition, npdcAppConfig) {

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;
  $scope.show();

  $scope.show().$promise.then(data => {
    npdcAppConfig.cardTitle = data.code;
  });
};

module.exports = ExpeditionShowController;
