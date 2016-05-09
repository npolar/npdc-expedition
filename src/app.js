'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('npdc-common/src/wrappers/leaflet');

var npdcExpeditionApp = angular.module('npdcExpeditionApp', ['npdcCommon']);

npdcExpeditionApp.controller('ExpeditionShowController', require('./show/ExpeditionShowController'));
npdcExpeditionApp.controller('ExpeditionSearchController', require('./search/ExpeditionSearchController'));
npdcExpeditionApp.controller('ExpeditionEditController', require('./edit/ExpeditionEditController'));
npdcExpeditionApp.directive('expeditionCoverage', require('./edit/coverage/coverageDirective'));



// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/', 'resource': 'NpolarApi'},
  {'path': '/user', 'resource': 'User'},
  {'path': '/dataset', 'resource': 'Dataset' },
  {'path': '/publication', 'resource': 'Publication' },
  {'path': '/project', 'resource': 'Project' },
  {'path': '/inventory', 'resource': 'Inventory'},
  {'path': '/expedition', 'resource': 'Expedition'}
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
  var autoconfig = new AutoConfig("test");
  angular.extend(npolarApiConfig, autoconfig, { resources });
  console.debug("npolarApiConfig", npolarApiConfig);

  $httpProvider.interceptors.push('npolarApiInterceptor');
});

npdcExpeditionApp.run(($http, npdcAppConfig, NpolarTranslate, NpolarLang) => {
  NpolarTranslate.loadBundles('npdc-expedition');
  npdcAppConfig.toolbarTitle = 'Expedition';
});


// API HTTP interceptor
/*npdcExpeditionApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcExpeditionApp.run(function(npolarApiConfig, npdcAppConfig){
  var environment = "test";
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig);

  npdcAppConfig.cardTitle = '';
  npdcAppConfig.toolbarTitle = 'Expedition Archive';

  console.log("npolarApiConfig", npolarApiConfig);
});*/
