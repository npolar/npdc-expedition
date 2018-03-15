'use strict';
/**
 *
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, Inventory, Dataset, Project, Publication, npdcAppConfig, NpolarApiSecurity) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;

  //Some fields should not be shown unless you are logged in
  $scope.isLoggedInAs = function() {
    return ($scope.security.getUser().email);
  };

      //need key for file upload
      let system = NpolarApiSecurity.getSystem('read', $scope.resource.path);
      if (system && system.key) {
         $scope.key = system.key;
      }


  $scope.mapOptions = {};

  let show = function() {
    $scope.show().$promise.then((expedition) => {

      if (expedition.locations) {
         let bounds = (expedition.locations).map((locations) => [[locations.south, locations.west], [locations.north, locations.east]]);
         $scope.mapOptions.coverage = bounds;
         $scope.mapOptions.geojson = "geojson";
      }

      var pi = [];
       //Convert from camelCase to human readable
      for(var a=0; a<($scope.document.people).length; a++){
            if ($scope.document.people[a].role === 'expedition/cruise leader'){
                             pi.push($scope.document.people[a]);

      }}
      $scope.pi = pi;

    });

  };


  show();

};




/* convert from camelCase to lower case text*/
function convert(str) {
       var  positions = '';

       for(var i=0; i<(str).length; i++){
           if(str[i].match(/[A-Z]/) !== null){
             positions += " ";
             positions += str[i].toLowerCase();
        } else {
            positions += str[i];
        }
      }
        return positions;
       }

module.exports = ExpeditionShowController;
