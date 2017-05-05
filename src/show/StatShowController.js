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


  // Sample data for pie chart
  $scope.pieData = [{
            name: "Fieldwork",
            y: 56.33
       }, {
            name: "Cruise",
            y: 24.03,
            sliced: true,
            selected: true
  }];


   // Invoke Chronopic on all datetime input fields using the material css extension
  new Chronopic('#start_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      $scope.start_date = value.toISOString();
    }
  });

  new Chronopic('#end_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      $scope.end_date = value.toISOString();
    }
  });


   // Invoke Chronopic on all datetime input fields using the material css extension
  new Chronopic('#start_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      $scope.start_date = value.toISOString();
    }
  });

  new Chronopic('#end_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      $scope.end_date = value.toISOString();
    }
  });


  //Get submitted dates, search for entries, extract values, push to service
  $scope.submit = function() {

        //Search the API
        var link = 'https://api.npolar.no/expedition/?q=&fields=start_date,end_date,people,locations&sort=';
        var link2 = '&filter-start_date=' + $scope.start_date + '..' + $scope.end_date;
        var link3 = '&filter-end_date=' + $scope.start_date + '..' + $scope.end_date;

         //Fetch search result
        ExpeditionSearchService.getValues(link+link2+link3).then(
              function(results) {
                  // on success
                  $scope.query2 = EstStats(results.data);
                  console.log("-------");
                  var doc = [{
                        name: "Microsoft Internet Explorer",
                        y: 56.33
                    }, {
                        name: "Chrome",
                        y: 24.03,
                        sliced: true,
                        selected: true
                    }, {
                        name: "Firefox",
                        y: 10.38
                    }, {
                        name: "Safari",
                        y: 4.77
                    }, {
                        name: "Opera",
                        y: 0.91
                    }, {
                        name: "Proprietary or Undetectable",
                        y: 0.2
                }];
                  ExpeditionJSONService.entryObject = doc;
                  console.log(ExpeditionJSONService.entryObject);
                  console.log("Getjson");
        });
  }; //Submit



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


