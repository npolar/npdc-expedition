'use strict';
/**
 *
 *
 * @ngInject
 */
var StatShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, npdcAppConfig, ExpeditionSearchService, chronopicService) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;



  new Chronopic('input[type="datetime"][lang="nb"]', { locale: 'nb', format: "{datetime}"  });

   console.log($scope);
   console.log("--------");

  //Define link path
  var href = window.location.href;
  //Remove last part of link
  var href1 = href.split('/stat');
  $scope.root_path = href1[0];

  //Search the API
  var link =  'https://api.npolar.no/expedition/?q=';

  var obj = {};

  $scope.submit = function() {
         console.log("hei");
         console.log($scope);
  };


  //Fetch search result
  ExpeditionSearchService.getValues(link).then(
       function(results) {
          // on success
          $scope.pieData = [results.data];
          // Sample data for pie chart
          $scope.obj = obj;
          $scope.query2 = EstStats(results.data);
          console.log($scope);
          console.log("-------");
  });

  // Sample data for pie chart
  obj.pieData = [{
             name: "Fieldwork",
             y: 4564
        }, {
             name: "Cruise",
             y: 5432,
             sliced: true,
             selected: true
  }];

  $scope.obj = obj;


  $scope.barData = [{
                name: 'research',
                y: 56.33
            }, {
                name: 'topographical mapping',
                y: 24.03
            }, {
                name: 'outreach VIP',
                y: 10.38
            }, {
                name: 'logistic operations',
                y: 4.77
            }, {
                name: 'other',
                y: 0.91
            }];
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


