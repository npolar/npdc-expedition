'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');
require('formula');
require('angular-route');
require('angular-npolar');

var npdcExpeditionApp = angular.module('npdcExpeditionApp', ['ngRoute', 'formula', 'npolarApi', 'npolarUi', 'npdcUi', 'templates']);

npdcExpeditionApp.controller('ExpeditionShowController', require('./show/ExpeditionShowController'));
npdcExpeditionApp.controller('ExpeditionSearchController', require('./search/ExpeditionSearchController'));
npdcExpeditionApp.controller('ExpeditionEditController', require('./edit/ExpeditionEditController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/expedition', 'resource': 'Expedition'},
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcExpeditionApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcExpeditionApp.config(require('./router'));

// API HTTP interceptor
npdcExpeditionApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcExpeditionApp.run(function(npolarApiConfig, npdcAppConfig){
  var environment = "production";
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig);

  npdcAppConfig.cardTitle = '';
  npdcAppConfig.toolbarTitle = 'Expedition Archive';

  console.log("npolarApiConfig", npolarApiConfig);
});
