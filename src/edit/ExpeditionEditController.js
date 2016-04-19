
'use strict';

var ExpeditionEditController = function($scope, $controller, $routeParams, Expedition, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService) {
  'ngInject';

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // Inventory -> npolarApiResource -> ngResource
  $scope.resource = Expedition;

  let formulaOptions = {
    schema: '//api.npolar.no/schema/expedition-1',
    form: 'edit/formula.json',
    templates: npdcAppConfig.formula.templates.concat([{
      match(field) {
        return ["alternate", "edit", "via"].includes(field.value.rel);
      },
      hidden: true
    } ]),
   languages: npdcAppConfig.formula.languages.concat([
    {
      map: require('./translation.json'),
      code: 'en'
    }]),
   onsave: function (model) {
    console.log(model);
   }
  };

  $scope.formula = formula.getInstance(formulaOptions);
 // formulaAutoCompleteService.autocompleteFacets(['organisations.name', 'organisations.email',
 //   'organisations.homepage', 'organisations.gcmd_short_name', 'links.type', 'sets', 'tags'], TrollBooking, $scope.formula);

  chronopicService.defineOptions({ match: 'released', format: '{date}'});
  chronopicService.defineOptions({ match(field) {
    return field.path.match(/^#\/activity\/\d+\/.+/);
  }, format: '{date}'});


  /* let dataLinkSuccess = function (file) {
    return {
      rel: 'DATA',
      href: file.url,
      title: file.filename,
      length: file.file_size,
      hash: [file.md5sum],
      type: file.content_type
    };
  }; */

   let fileToValueMapper = function (file) {
      return {
        rel: 'data',
        href: file.url,
        title: file.filename,
        length: file.file_size,
        hash: [file.md5sum],
        type: file.content_type
      };
    };

    let valueToFileMapper = function (value) {
      if (value.rel !== 'data') {
        return null;
      }
      return {
        filename: value.title,
        file_size: value.length,
        url: value.href
      };
    };

  fileFunnelService.fileUploader({
    match(field) {
      return field.id === "links" && field.instance === "data";
    },
    multiple: true,
    server: 'https://apptest.data.npolar.no:3000/inventory/:id/_file/',
    fileToValueMapper, valueToFileMapper, fields: ['rel']}, $scope.formula);


  /*fileFunnelService.fileUploader({
    match(field) {
       return field.id === "links" && field.instance === "data";
    },
    server: 'https://apptest.data.npolar.no:3000/inventory/:id/_file/',
    successCallback: dataLinkSuccess,
    filterValues: function (value) {
      return value.rel.toUpperCase() === 'DATA';
    },
    restricted: false
  }, $scope.formula); */


  $scope.edit();
};

module.exports = ExpeditionEditController;