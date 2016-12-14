
'use strict';

var ExpeditionEditController = function($scope, $controller, $routeParams, Expedition, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang,
  npolarApiConfig, NpolarApiSecurity, NpolarMessage, npolarCountryService) {
  'ngInject';

  function init() {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // Inventory -> npolarApiResource -> ngResource
  $scope.resource = Expedition;

  let formulaOptions = {
      schema: '//api.npolar.no/schema/expedition-1',
      form: 'edit/formula.json',
      language: NpolarLang.getLang(),
      templates: npdcAppConfig.formula.templates.concat([{
        match(field) {
          if (field.id === 'links_item') {
            let match;

          // Hide data links and system links for the ordinary links block (defined in formula as instance === 'links')
            match = ["data", "alternate", "edit", "via"].includes(field.value.rel) && field.parents[field.parents.length-1].instance === 'links';
            console.log(match, field.id, field.path, 'value', field.value, 'instance', field.parents[field.parents.length-1].instance);
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
    querySource: npolarApiConfig.base + '/country/?q-name=',
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

 // formulaAutoCompleteService.autocompleteFacets(['people.first_name',
 //   'people.last_name', 'people.organisation', 'platforms.sponsor', 'tags', 'platforms.vessel_name'], Expedition, $scope.formula);

  formulaAutoCompleteService.autocompleteFacets(['people.first_name',
    'people.last_name', 'platforms.sponsor', 'people.organisation', 'tags', 'platforms.vessel_name'], Expedition, $scope.formula);

//  chronopicService.defineOptions({ match: 'released', format: '{date}'});
//  chronopicService.defineOptions({ match(field) {
//    return field.path.match(/^#\/activity\/\d+\/.+/);
//  }, format: '{date}'});

//Set chronopic view format (this does not change the internal value, i.e. ISO string date)
 chronopicService.defineOptions({ match(field) {
    return field.path.match(/_date$/);
 }, format: '{date}'});

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

};

module.exports = ExpeditionEditController;