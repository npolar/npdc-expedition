'use strict';
/**
 * @ngInject
 */
var ExpeditionSearchController = function ($filter, $scope, $route, $location, $controller, Expedition, npdcAppConfig) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Expedition;

  $scope.stat = localStorage.getItem("stat");


  $scope.submit = function() {
     localStorage.setItem("stat", true);
     window.location.reload();
  };

  npdcAppConfig.search.local.results.detail = (entry) => {
     let r = "Last updated: ";
     return r+` ${$filter('date')(entry.updated)}`;
  };



  npdcAppConfig.cardTitle = "Expedition Archive";
  npdcAppConfig.search.local.results.subtitle = "type";
  npdcAppConfig.search.local.filterUi = {
    'year-activity.departed': {
      type: 'range'
    },
    'updated': {
      type: 'hidden'
    }
  };

  let query = function() {
    let defaults = { limit: "all", sort: "-updated", fields: 'code,id,updated,type,activity.departed',
      'date-year': 'activity.departed', facets: 'tags,people.email,updated,locations.area' };
    let invariants = $scope.security.isAuthenticated() ? {} : {} ;
    return Object.assign({}, defaults, invariants);
  };

  $scope.search(query());

  $scope.$on('$locationChangeSuccess', (event, data) => {
    $scope.search(query());
  });

};

module.exports = ExpeditionSearchController;
