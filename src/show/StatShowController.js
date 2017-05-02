'use strict';
/**
 *
 *
 * @ngInject
 */
var StatShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, Inventory, Dataset, Project, Publication, npdcAppConfig, ExpeditionSearchService) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;

  //Define link path
  var href = window.location.href;
  //Remove last part of link
  var href1 = href.split('/stat');
  $scope.root_path = href1[0];

  //Search the API
  var link =  'https://api.npolar.no/expedition/?q=';

  //Fetch search result
  ExpeditionSearchService.getValues(link).then(
       function(results) {
          // on success
          $scope.query = results.data;
          console.log($scope.query);
          $scope.query2 = EstStats(results.data);
          console.log($scope.query2);
  });
 };



/* Estimate the diagram values */
function EstStats(data) {

           //Summarize the date results
           var num = (data.feed.entries).length;

           //type_arr holds all dates for type (cruise or fieldwork)
           var type_arr = Array.apply(null, Array(2)).map(Number.prototype.valueOf,0);

           for (var i = 0; i < num; i++) {
              var entry = data.feed.entries[i];

              // var activity_arr = [];
              let t_arr = entry.type === 'cruise' ?  0 : 1;

              //Find date diff between start and end date
              var diff =  Math.floor( ((Date.parse(entry.end_date)) - (Date.parse(entry.start_date))) / 86400000);

              //If people listed
              if (typeof entry.people !== 'undefined') {
                //Traverse through people
                for (var j = 0; j < entry.people.length; j++) {
                  type_arr[t_arr] =  type_arr[t_arr] + diff;
                } //for j
              }

          } //for i
        return type_arr;
}



module.exports = StatShowController;


