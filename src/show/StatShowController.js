'use strict';
/**
 *
 *
 * @ngInject
 */
var StatShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, npdcAppConfig, ExpeditionSearchService, ExpeditionJSONService, chronopicService) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;

  //Define link path
  var href = window.location.href;
  //Remove last part of link
  var href1 = href.split('/stat');
  $scope.root_path = href1[0];

  //Chronopic input values
  $scope.start_date = null;
  $scope.end_date = null;


    // Invoke Chronopic on all datetime input fields using the material css extension
  new Chronopic('#start_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      console.log("start_date");
      $scope.start_date = value.toISOString();
    }
  });


   // Invoke Chronopic on all datetime input fields using the material css extension
  new Chronopic('#end_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
        console.log("end_date");
      $scope.end_date = value.toISOString();
    }
  });



  //Get submitted dates, search for entries, extract values, push to service
  $scope.submit = function() {

      if ($scope.start_date && $scope.end_date) {

        //Search the API
        var link = 'https://api.npolar.no/expedition/?q=&fields=start_date,end_date,people,locations&sort=';
        var link2 = '&filter-start_date=' + $scope.start_date + '..' + $scope.end_date;
        var link3 = '&filter-end_date=' + $scope.start_date + '..' + $scope.end_date;

         //Fetch search result
        ExpeditionSearchService.getValues(link+link2+link3).then(
              function(results) {
                  // on success
                  var query = EstStats(results.data);
                  console.log(query);
                  var tot = 100/(query[0] + query[1]);

                  // Sample data for pie chart
                  var activity_type = [{
                        name: "research",
                        y: 56.33
                      }, {
                        name: "topographical mapping",
                        y: 24.03
                      }, {
                        name: "outreach VIP",
                        y: 10.38
                      }, {
                        name: "logistic operations",
                        y: 4.77
                      }, {
                        name: "other",
                        y: 0.91
                   }];
                  var type = [{
                              name: "Fieldwork",
                              y: query[0] *tot
                       }, {
                            name: "Cruise",
                            y: query[1] * tot,
                            sliced: true,
                            selected: true
                  }];

                  //Put together the full object
                  var inputData = {activity_type,type};
                  //Push object to service
                  ExpeditionJSONService.entryObject = inputData;
        });
      }
  };  //Submit

   //If show is true, show highslide charts
   $scope.show = function(){
      if ((ExpeditionJSONService.entryObject).data !== null) {
           console.log("show");
          $scope.type = (ExpeditionJSONService.entryObject).type;
           console.log((ExpeditionJSONService.entryObject).type);
          return true;
      } else {
         console.log("hide");
           return false;
      }

   };

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


