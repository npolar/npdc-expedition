'use strict';
/**
 *
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, $routeParams, Expedition, NpolarApiSecurity, npdcAppConfig) {

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;
  $scope.security = NpolarApiSecurity;
  $scope.show();

  $scope.show().$promise.then(data => {
    npdcAppConfig.cardTitle = data.code;
  });
};

module.exports = ExpeditionShowController;
