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

  $scope.submit2 = function(input) {
     //window.location.href = '/expedition#test';
     window.location.reload();
     if (input === 'back'){
        window.location.href = '/expedition';
     } else {
        window.location.href = '/expedition#csv';
     }
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

      $scope.start_date = '2016-05-01T13:00:00Z';
      $scope.end_date = '2017-06-01T13:00:00Z';

      if ($scope.start_date && $scope.end_date) {

        //Search the API
        var link = 'https://api.npolar.no/expedition/?q=&fields=start_date,end_date,people,draft,locations,id,type,activity_type&sort=';
        var link2 = '&filter-start_date=' + $scope.start_date + '..' + $scope.end_date;
        var link3 = '&filter-end_date=' + $scope.start_date + '..' + $scope.end_date;

         //Fetch search result
        ExpeditionSearchService.getValues(link+link2+link3).then(
              function(results) {
                   // on success
                   console.log(results.data);
                  $scope.all = EstStats(results.data);

                //   $scope.persons = all.persons;
                 //  $scope.total = (all.type_arr[0] + all.type_arr[1]);
                //  $scope.type_arr = all.type_arr;
                 //  $scope.roles_arr = all.roles_arr;
                //   $scope.activity_type_arr = all.activity_type_arr;

                  //Put together the full object
                //  var inputData = {activity_type_arr,type_arr};
                  //Push object to service
                // ExpeditionJSONService.entryObject = inputData;
        });
      }
  };  //Submit

   //If show is true, show highslide charts
   $scope.show = function(){
      if ((ExpeditionJSONService.entryObject).data !== null) {
           console.log("show");
          $scope.type = (ExpeditionJSONService.entryObject).type;
          // console.log((ExpeditionJSONService.entryObject).type);
          return true;
      } else {
         //console.log("hide");
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
           //Array to hold all dates per roles
           var roles_arr = Array.apply(null, Array(6)).map(Number.prototype.valueOf,0);
           //Array to hold all dates per activity_type
           var activity_type_arr = Array.apply(null, Array(5)).map(Number.prototype.valueOf,0);
           //Country - array of hashes
           var country_arr = [];

           //Go across all date entries
           var persons = 0;

           //What kind of activity_type?
           let activity_type = {'research':0,'topographical mapping':1,'outreach VIP':2,'logistic operations':3,'other':4};

           //What kind of role?
           let roles = { 'expedition/cruise leader':0,'field assistant':1,'guest':2,'investigator':3,'technician':4, 'other':5};


           for (var i = 0; i < num; i++) {
              var entry = data.feed.entries[i];

              //cruise or fieldwork?
              let t_arr = entry.type === 'cruise' ?  0 : 1;

              //Find date diff between start and end date - this is cruise start and end
              var diff =  Math.floor( ((Date.parse(entry.end_date)) - (Date.parse(entry.start_date))) / 86400000);

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
                     console.log(entry.people[j]['@country']);
                     console.log(country_arr[entry.people[j]['@country']]);
                     country_arr.push(obj);
                  }

                  //check roles, if yes, split roles, add one by one and add days per role
                  if (typeof entry.people[j].roles !== 'undefined') {
                     console.log(entry.people[j].roles[0]);
                     console.log(roles_arr[roles[entry.people[j].roles[0]]]);
                     roles_arr[roles[entry.people[j].roles[0]]] = roles_arr[roles[entry.people[j].roles[0]]] + diff;
                  }
                } //for j
              }

          } //for i
          console.log(type_arr);
          console.log(activity_type_arr);
          console.log(roles_arr);
          console.log(country_arr);
          console.log("------------");

          //Sort country array, sum up all
          for (var m = 0; m < country_arr.length; m++) {
             country_arr[m].country ===
          }

        return {type_arr, activity_type_arr, persons, roles_arr, country_arr};
}



module.exports = StatShowController;


