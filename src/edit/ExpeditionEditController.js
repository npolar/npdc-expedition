'use strict';

// @ngInject

var ExpeditionEditController = function($scope, $controller, $routeParams, $http, $sce, Expedition, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang,
  npolarApiConfig, NpolarApiSecurity, NpolarMessage, npolarCountryService) {

  var proj4 = require('proj4');

  function init() {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // Inventory -> npolarApiResource -> ngResource
  $scope.resource = Expedition;

  let formulaOptions = {
      schema: npolarApiConfig.base + '/schema/expedition-1',
      form: 'edit/formula.json',
      language: NpolarLang.getLang(),
      templates: npdcAppConfig.formula.templates.concat([{
        match(field) {
          if (field.id === 'links_item') {
            let match;

          // Hide data links and system links for the ordinary links block (defined in formula as instance === 'links')
            match = ["data", "alternate", "edit", "via"].includes(field.value.rel) && field.parents[field.parents.length-1].instance === 'links';
          //  console.log(match, field.id, field.path, 'value', field.value, 'instance', field.parents[field.parents.length-1].instance);
            return match;
          }
        },
        hidden: true
      },  {
        match: "locations_item",
        template: "<expedition:coverage></expedition:coverage>"
      } //,
  //  {
  //      match: "placenames_item",
  //      template: '<npdc:formula-placename></npdc:formula-placename>'
  //    }
    ]),
      languages: npdcAppConfig.formula.languages.concat([{
        map: require('./en.json'),
        code: 'en'
      }, {
        map: require('./no.json'),
        code: 'nb_NO',
      }])
    };


  $scope.formula = formula.getInstance(formulaOptions);
  initFileUpload($scope.formula);

  formulaAutoCompleteService.autocomplete({
    match: "@country",
  //  querySource: npolarApiConfig.base + '/country/?q-name=',
    querySource: npolarApiConfig.base + '/country',
    label: 'name',
    value: 'code'
  }, $scope.formula);

  formulaAutoCompleteService.autocomplete({
    match: "@departure_country",
    querySource: npolarApiConfig.base + '/country',
    label: 'name',
    value: 'code'
  }, $scope.formula);

  formulaAutoCompleteService.autocomplete({
    match: "@return_country",
    querySource: npolarApiConfig.base + '/country',
    label: 'name',
    value: 'code'
  }, $scope.formula);

  formulaAutoCompleteService.autocompleteFacets(['people.first_name',
    'people.last_name', 'platforms.sponsor', 'people.organisation', 'tags', 'platforms.vessel_name'], Expedition, $scope.formula);

    // Set default #/people/expedition_dates/start_date based on #/start_date
    chronopicService.defineOptions({
      match(field) {
        return field.path === "#/start_date";
      },
      format: '{date}',
      onChange(elem, date) {
        $scope.formula.getFieldByPath("#/people/0/expedition_dates/0/start_date").then(function(field) {
          field.schema.default = date.toISOString();
        });
      }
    });


// Set default #/people/expedition_dates/end_date based on #/end_date
chronopicService.defineOptions({
  match(field) {
    return field.path === "#/end_date";
  },
  format: '{date}',
  onChange(elem, date) {
    $scope.formula.getFieldByPath("#/people/0/expedition_dates/0/end_date").then(function(field) {
      field.schema.default = date.toISOString();
    });
  }
});

//Set chronopic view format (this does not change the internal value, i.e. ISO string date)
chronopicService.defineOptions({
  match(field) {
    return field.path.match(/^#\/.+?\/.+?_date$/);
  },
  format: '{date}'
});


$scope.formula.getFieldByPath("#/people").then(function(field) {
});

}

 function initFileUpload(formula) {

    let server = `${NpolarApiSecurity.canonicalUri($scope.resource.path)}/restricted/:id/_file`;

    fileFunnelService.fileUploader({
      match(field) {
        return field.id === "files";
      },
      server,
      multiple: true,
      progress: false,
       restricted: function () {
        return formula.getModel().restricted;
      },
      fileToValueMapper: Expedition.fileObject,
      valueToFileMapper: Expedition.hashiObject,
      fields: ['filename'] // 'type', 'hash'
    }, formula);
}

  try {
    init();

     // edit (or new) action
     $scope.edit();

  } catch (e) {
    NpolarMessage.error(e);
  }

  $scope.$watch('formula.getModel().ris', function(ris) {

  let p = $scope.formula.getModel();

  //if it is a ris project number, that is a number with 3-5 digits
  if (((/^[0-9]{3,5}$/).test(p.ris))&&(!p.id)&&(p.activity_type==='')) {


      $http.get('https://cors-anywhere.herokuapp.com/https://www.researchinsvalbard.no/api/project/'+p.ris+'.json',{
       headers: {'Accept': 'application/json'} }).success(function(data){

        //console.log("Calling Research in Svalbard successful.");
        p = get_RIS(p,data);
        $scope.formula.setModel(p);

        //This part has to be run twice - needs also to be run  after RIS to ensure date defaults
        // Set default #/people/expedition_dates/start_date based on #/start_date
        chronopicService.defineOptions({
          match(field) {
            return field.path === "#/start_date";
          },
          format: '{date}',
          onChange(elem, date) {
            $scope.formula.getFieldByPath("#/people/0/expedition_dates/0/start_date").then(function(field) {
              field.schema.default = date.toISOString();
            });
          }
        });


// Set default #/people/expedition_dates/end_date based on #/end_date
chronopicService.defineOptions({
  match(field) {
    return field.path === "#/end_date";
  },
  format: '{date}',
  onChange(elem, date) {
    $scope.formula.getFieldByPath("#/people/0/expedition_dates/0/end_date").then(function(field) {
      field.schema.default = date.toISOString();
    });
  }
});

    }).error(function(data, status, headers, config) {
        console.log("Calling Research in Svalbard failed.");
        console.log(data, status, headers, config);
    });

  } //if
  }); //end $watch


 //Move RIS values to formula object
 function get_RIS(p,data) {
      //Create a new object if not already existing
      if (!p.id) {
            p = Object.assign({}, Expedition.create(),p);
      }

      //Do the assignments with RiS
      p.type = "fieldwork";
      p.activity_type = "research";

      //Fieldworks could be more than one, we select the last fieldwork
      if ((data.fieldworks) && ((data.fieldworks).length > 0)) {
          let count = ((data.fieldworks).length)-1;
          if (data.fieldworks[count].startDate) {
            p.start_date = data.fieldworks[count].startDate + 'T12:00:00Z';
          }
          if (data.fieldworks[count].endDate) {
            p.end_date = data.fieldworks[count].endDate + 'T12:00:00Z';
          }
          //Need location also - goes here - use proj4
          let loc = {};
          let utm33 = proj4('+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs');
          let decimal_coord = proj4(utm33,'EPSG:4326').forward([data.fieldworks[count].utm33East, data.fieldworks[count].utm33North]);

          if (data.fieldworks[count].utm33East) {
             loc.longitude = decimal_coord[0];
          }
          if (data.fieldworks[count].utm33North) {
             loc.latitude = decimal_coord[1];
          }
          //Insert locations from RiS into our return object
          p.locations = [loc];
        }

        let temp_arr = [];
        if ((data.persons) && ((data.persons).length > 0)) {
           //Traverse through all persons objects
           for (let k=0;k<(data.persons).length; k++){

             let obj = {
                first_name:data.persons[k].givenName,
                last_name: data.persons[k].surName,
                expedition_dates:[{start_date: p.start_date, end_date: p.end_date}],
                role: data.persons[k].role };

            temp_arr[k] = obj;

             //New names for project owner
             if (temp_arr[k].role === 'Project Owner') {
                 temp_arr[k].role = 'expedition/cruise leader';
                 temp_arr.splice(temp_arr[k], 0, temp_arr.splice(temp_arr[k], 1)[0]);
                 temp_arr.splice(0, 0, temp_arr[k]); //Insert elem at the start
                 temp_arr.splice(k+1,1); //Remove elem from place K
             } else {
                  temp_arr[k].role = 'other';
             }
          }

        }

        //Clean temp_arr for name duplicates
        let m = 0;
        while (m < temp_arr.length) {
          for (let l=(m+1);l<(temp_arr.length); l++){
                 let inner = (({last_name,first_name }) => ({ last_name,first_name }))(temp_arr[l]);
                 let outer = (({last_name,first_name }) => ({ last_name,first_name }))(temp_arr[m]);
                 if (JSON.stringify(inner) === JSON.stringify(outer)) {
                   temp_arr.splice(l,1); l=l-1; }
          }
          m++;
        }

        //Copy result to p.people
        p.people = temp_arr;

        if (data.summary !== undefined) { p.summary = data.summary; }
        if (data.name !== undefined) { p.code = data.name; }

    return p;
 }

};

module.exports = ExpeditionEditController;
