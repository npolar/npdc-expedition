'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);
require('npdc-common/src/wrappers/leaflet');

var npdcExpeditionApp = angular.module('npdcExpeditionApp', ['npdcCommon', 'leaflet']).value('Highcharts', Highcharts);

npdcExpeditionApp.controller('ExpeditionShowController', require('./show/ExpeditionShowController'));
npdcExpeditionApp.controller('ExpeditionSearchController', require('./search/ExpeditionSearchController'));
npdcExpeditionApp.controller('ExpeditionEditController', require('./edit/ExpeditionEditController'));
npdcExpeditionApp.controller('StatShowController', require('./show/StatShowController'));
npdcExpeditionApp.controller('MapShowController', require('./show/MapShowController'));
npdcExpeditionApp.controller("ExpeditionMapController", require("./search/ExpeditionMapController"));
npdcExpeditionApp.factory('ExpeditionSearchService', require('./show/ExpeditionSearchService'));
npdcExpeditionApp.factory('Expedition', require('./Expedition.js'));
npdcExpeditionApp.directive('expeditionCoverage', require('./edit/coverage/coverageDirective'));
npdcExpeditionApp.directive('hcPieChart', require('./show/hcPieChart'));
npdcExpeditionApp.directive('hcBarChart', require('./show/hcBarChart'));



// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/dataset', 'resource': 'Dataset' },
  {'path': '/publication', 'resource': 'Publication' },
  {'path': '/project', 'resource': 'Project' },
  {'path': '/inventory', 'resource': 'Inventory'},
  {'path': '/expedition', 'resource': 'ExpeditionResource'},
  {'path': '/expedition/track', 'resource': 'ExpeditionTrack', cache: true, base: '//api.npolar.no' },
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcExpeditionApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});


npdcExpeditionApp.factory('L', function() {
  return window.L; // assumes Leaflet has already been loaded on the page
});

// Routing
npdcExpeditionApp.config(require('./router'));


npdcExpeditionApp.config(($httpProvider, npolarApiConfig) => {
  var autoconfig = new AutoConfig("production");
   //var autoconfig = new AutoConfig("test");
  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcExpeditionApp.run(($http, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  npdcAppConfig.help = {uri: 'https://github.com/npolar/npdc-expedition/wiki' };
  NpolarTranslate.loadBundles('npdc-expedition');
  npdcAppConfig.toolbarTitle = 'Expedition';
});
