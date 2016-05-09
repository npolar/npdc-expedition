
'use strict';

var ExpeditionEditController = function($scope, $controller, $routeParams, Expedition, formula,
  formulaAutoCompleteService, npdcAppConfig, chronopicService, fileFunnelService, NpolarLang,
  npolarApiConfig, NpolarApiSecurity, NpolarMessage, npolarCountryService) {
  'ngInject';

  // EditController -> NpolarEditController
  $controller('NpolarEditController', {
    $scope: $scope
  });

  // Inventory -> npolarApiResource -> ngResource
  $scope.resource = Expedition;

  let templates = [{
      match: "people_item",
      template: '<npdc:formula-person></npdc:formula-person>'
    }, {
      match: "placenames_item",
      template: '<npdc:formula-placename></npdc:formula-placename>'
    },
    {
      match: "coverage_item",
      template: "<inventory:coverage></inventory:coverage>"
    }
  ];

  let i18n = [{
      map: require('./en.json'),
      code: 'en'
    },
    {
      map: require('./no.json'),
      code: 'nb_NO',
    }];


    $scope.formula = formula.getInstance({
       schema: '//api.npolar.no/schema/expedition-1',
       form: 'edit/formula.json',
       language: NpolarLang.getLang(),
       templates:  npdcAppConfig.formula.templates.concat(templates),
       languages: npdcAppConfig.formula.languages.concat(i18n)
    });


  formulaAutoCompleteService.autocompleteFacets(['people.first_name',
    'people.last_name', 'links.type', 'tags'], Expedition, $scope.formula);

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

 /*  let fileToValueMapper = function (file) {
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


  fileFunnelService.fileUploader({
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


  function initFileUpload(formula) {

    let server = `${NpolarApiSecurity.canonicalUri($scope.resource.path)}/:id/_file`;
    fileFunnelService.fileUploader({
      match(field) {
        return field.id === "files";
      },
      server,
      multiple: true,
      progress: false,
      restricted: function () {
        return !formula.getModel().license;
      },
      fileToValueMapper: Expedition.fileObject,
      valueToFileMapper: Expedition.hashiObject,
      fields: [] // 'type', 'hash'
    }, formula);
  }


  try {
    initFileUpload($scope.formula);
    // edit (or new) action
    $scope.edit();
  } catch (e) {
    NpolarMessage.error(e);
  }
};

module.exports = ExpeditionEditController;