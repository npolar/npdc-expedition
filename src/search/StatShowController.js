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

  $scope.submit2 = function(input) {
     //window.location.href = '/expedition#test';
     window.location.reload();
     window.location.href = '/expedition';
  };

   //define link path
  var href = window.location.href;
  var trunk = href.split('expedition');
   if (trunk[1] === '/#stat') {
          $scope.stat = true;
  } else {
          $scope.stat = false;
  }


  //Define link path
 // var href = window.location.href;
  //Remove last part of link
 // var href1 = href.split('/stat');
  //$scope.root_path = href1[0];

  //Chronopic input values
 // $scope.start_date = null;
 // $scope.end_date = null;


  // Invoke Chronopic on all datetime input fields using the material css extension
/*  new Chronopic('#start_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
      console.log("start_date");
      $scope.start_date = value.toISOString();
    }
  }); */


   // Invoke Chronopic on all datetime input fields using the material css extension
  /* new Chronopic('#end_date', {
    className: '.chronopic.chronopic-ext-md',
    format: '{date}',
    onChange: function(element, value) {
        console.log("end_date");
      $scope.end_date = value.toISOString();
    }
  }); */


  //Get submitted dates, search for entries, extract values, push to service
  $scope.submit = function() {

      $scope.start_date = '2016-01-01T13:00:00Z';
      $scope.end_date = '2016-12-01T13:00:00Z';

      if ($scope.start_date && $scope.end_date) {

        //Search the API
        var link = 'https://api.npolar.no/expedition/?q=&fields=start_date,end_date,people,draft,locations,id,type,activity_type&sort=';
        var link2 = '&filter-start_date=' + $scope.start_date + '..' + $scope.end_date;
        var link3 = '&filter-end_date=' + $scope.start_date + '..' + $scope.end_date;

         //Fetch search result
        ExpeditionSearchService.getValues(link+link2+link3).then(
              function(results) {
                   // on success
                  $scope.all = EstStats(results.data);

        });
      }
  };  //Submit

 };



/* Estimate the diagram values */
function EstStats(data) {

           //Summarize the date results
           var num = (data.feed.entries).length;

           //type_arr holds all dates for type (cruise or fieldwork)
           var type_arr = Array.apply(null, Array(2)).map(Number.prototype.valueOf,0);
           //Array to hold all dates per roles
           var roles_arr = Array.apply(null, Array(6)).map(Number.prototype.valueOf,0);
           //Array to hold all dates per activity_type
           var activity_type_arr = Array.apply(null, Array(5)).map(Number.prototype.valueOf,0);
           //Array to holde locations
           var locations_arr = Array.apply(null, Array(18)).map(Number.prototype.valueOf,0);
           //Country - array of hashes
           var country_arr = [];

           //Go across all date entries
           var persons = 0;
           //Total number of days
           var total = 0;

           //What kind of activity_type?
           let activity_type = {'research':0,'topographical mapping':1,'outreach VIP':2,'logistic operations':3,'other':4};

           //What kind of role?
           let roles = { 'expedition/cruise leader':0,'field assistant':1,'guest':2,'investigator':3,'technician':4, 'other':5};

           let locations = { "Sverdrup Research Station":0,"Zeppelin Research Station":1,"Ny-Ålesund":2,"Svalbard":3,
                          "Frans Josefs land":4,"Bjørnøya":5,"Jan Mayen":6,"Hopen":7,"Bouvetøya":8,"Troll":9,"Tor":10,
                          "Dronning Maud Land":11,"Antarctica":12,"Fram Strait":13,"Arctic Ocean":14,"Barents Sea North":15,
                          "Southern Ocean":16,"other":17 };

           for (var i = 0; i < num; i++) {
              var entry = data.feed.entries[i];

              //cruise or fieldwork?
              let t_arr = entry.type === 'cruise' ?  0 : 1;

              //Find date diff between start and end date - this is cruise start and end
              var diff =  Math.floor( ((Date.parse(entry.end_date)) - (Date.parse(entry.start_date))) / 86400000);
              total = total + diff;


               //If people listed
              if (typeof entry.locations !== 'undefined') {
                   for (var n = 0; n < entry.locations.length; n++) {
                       if (typeof entry.locations[n].places !== 'undefined') {
                         var loc_obj = {};
                         for (var p = 0; p < entry.locations[n].places.length; p++) {
                            if (typeof entry.locations[n].places[p].predefined_area !== 'undefined') {
                              loc_obj.predefined_area = entry.locations[n].places[p].predefined_area;
                            if ((typeof entry.locations[n].places[p].end_date !== 'undefined') && (typeof entry.locations[n].places[p].start_date !== 'undefined')) {
                               loc_obj.days =  Math.floor( ((Date.parse(entry.locations[n].places[p].end_date)) - (Date.parse(entry.locations[n].places[p].start_date))) / 86400000);
                            } else {
                               loc_obj.days = diff;
                            }
                               locations_arr[locations[loc_obj.predefined_area]] = locations_arr[locations[loc_obj.predefined_area]] + loc_obj.days;
                            } //if predefined area
                         }
                       }
                   }
              }

              //If people listed
              if (typeof entry.people !== 'undefined') {
                //Extract number of persons in field
                persons = entry.people.length + persons;

                //Traverse through people
                for (var j = 0; j < entry.people.length; j++) {
                   var diff_people = 0;

                  //check if dates exists => if yes, count them, if no, use diff
                  if (typeof entry.people[j].expedition_dates !== 'undefined') {
                      //Traverse over til people dates
                      for (var k = 0; k < entry.people[j].expedition_dates.length; k++) {
                            //Find date diff between start and end date - this is cruise start and end
                            var diff2 =  Math.floor( ((Date.parse(entry.people[j].expedition_dates[k].end_date)) - (Date.parse(entry.people[j].expedition_dates[k].start_date))) / 86400000);
                            diff_people = diff_people + diff2;
                       } //for k
                      } //if
                      //Use people dates if filled in
                      if (diff_people > 0) { diff = diff_people; }

                      //type
                      type_arr[t_arr] =  type_arr[t_arr] + diff;
                      //activity_type
                      activity_type_arr[activity_type[entry.activity_type]] = activity_type_arr[activity_type[entry.activity_type]] + diff;



                  //check if person has country, get country, match country => if yes, add diff_person, if no, add diff
                  if (typeof entry.people[j]['@country'] !== 'undefined') {
                     var obj = {country:"", days:""};
                     obj.country = entry.people[j]['@country'];
                     obj.days = diff;
                     country_arr.push(obj);
                  }

                  //check roles, if yes, split roles, add one by one and add days per role
                  if (typeof entry.people[j].roles !== 'undefined') {
                     roles_arr[roles[entry.people[j].roles[0]]] = roles_arr[roles[entry.people[j].roles[0]]] + diff;
                  }
                } //for j
              }

          } //for i

          //Sort country array
          country_arr.sort(function(a,b){
                var countryA = a.country.toUpperCase(); // uppercase only
                var countryB = b.country.toUpperCase();
                if (countryA < countryB) { return -1; }
                if (countryA > countryB) { return 1; }
                // names are equal
                return 0;
          });

          //Collapse array and sum values
          for (var m = 0; m < country_arr.length-1;) {
             if (country_arr[m].country === country_arr[m+1].country) {
                //sum up in m
                country_arr[m].days = country_arr[m].days + country_arr[m+1].days;
                //remove now additional entry m+1
                country_arr.splice(m+1, 1);
             } else {
                m++;
             }
          }

        return {type_arr, activity_type_arr, persons, total, roles_arr, country_arr, locations_arr};
}



module.exports = StatShowController;


