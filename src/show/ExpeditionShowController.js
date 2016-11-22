'use strict';
/**
 *
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, Inventory, Dataset, Project, Publication, npdcAppConfig) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;

 // $scope.pi = [{
 //          "first_name": "Per Inge",
 //          "last_name": "Myhre",
 //          "organisation": "Norwegian Polar Institute",
 //          "@country": "NO",
 //          "roles": [
 //              "principal investigator"
 //          ]
 //      }
 //      ];


  //Some fields should not be shown unless you are logged in
  $scope.isLoggedInAs = function() {
    return ($scope.security.getUser().email);
  };


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
         for(var b=0; b<($scope.document.people[a].roles).length; b++){
            if ($scope.document.people[a].roles[b] === 'expedition/cruise leader'){
                             pi.push($scope.document.people[a]);
            }
      }}
      $scope.pi = pi;

      //Convert from camelCase to human readable
      for(var j=0; j<($scope.document.activity).length; j++){
         $scope.document.activity[j].activity_type = convert($scope.document.activity[j].activity_type);
      }

      //Convert from camelCase to human readable
      for(var i=0; i<($scope.document.people).length; i++){
      	 for(var k=0; k<($scope.document.people[i].roles).length; k++){
         $scope.document.people[i].roles[k] = convert($scope.document.people[i].roles[k]);
      }}

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


