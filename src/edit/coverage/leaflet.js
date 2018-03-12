

'use strict';

let angular = require('angular');
let L = require('leaflet');
let EsriLeaflet = require('esri-leaflet');
let Proj4Leaflet = require('proj4leaflet');

L.esri = EsriLeaflet;
L.Proj = Proj4Leaflet;

require('leaflet-draw');
require('leaflet-fullscreen');



let leaflet = function ($compile, $timeout) {
//angular.module('leaflet', []).directive('leaflet', function($compile, $timeout) {
  'ngInject';

  console.debug('leaflet', L);

  const base = '//geodata.npolar.no/arcgis/rest/services';
  L.Icon.Default.imagePath = '/assets/images';

  function isSvalbard(config) {
    let s = false;
    if (config.bbox) {
      if ( (config.bbox[1] > 74) && (config.bbox[0] > 0) && (config.bbox[2] < 60.0) ) {
        s = true;
      }
    }
    return s;
  }

  function crsFactory() {
    return new L.Proj.CRS('EPSG:25833', '+proj=utm +zone=33 +ellps=GRS80 +units=m +no_defs', {
      transformation: new L.Transformation(1, 5120900, -1, 9998100),
      resolutions: [2709.3387520108377,
        1354.6693760054188,
        677.3346880027094,
        338.6673440013547,
        169.33367200067735,
        84.66683600033868,
        42.33341800016934,
        21.16670900008467,
        10.583354500042335,
        5.291677250021167,
        2.6458386250105836,
        1.3229193125052918,
        0.6614596562526459,
        0.33072982812632296,
        0.16536491406316148]
    });
  }

  function tileLayerFactory(options) {
    if (isSvalbard(options)) {
      let esriBase = `//${base}/Basisdata_Intern/NP_Nordomraadene_WMTS_25833/MapServer`;
      return new L.esri.tiledMapLayer({
        url: esriBase,
        continuousWorld: true,
        attribution: `<a href="http://npolar.no">Norsk Polarinstitutt</a>`,
      });
    }

    // Esri sat images
    return L.tileLayer('//services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}/', {
      attribution: 'Esmapri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community'
    });
  }

  return {
    scope: {
      options: '='
    },
    template: '<div class="leaflet-map"></div>',
    link: function(scope, iElement) {

      let mapOptions = Object.assign({
        minZoom: 2,
        maxBounds: [
          [-90, 180],
          [90, -180]
        ],
        fullscreenControl: true
      });
      let coverage = scope.options.coverage;

      let tileLayer = tileLayerFactory(scope.options);

      if (isSvalbard(scope.options)) {
        mapOptions.crs = crsFactory();
      }
      let map = L.map(iElement.find('div')[0], mapOptions).setView([78.22, 15.64], 4);
      console.log("map",map);

      tileLayer.addTo(map);

      let drawnItems;

      map.on('moveend', e => {
        scope.$emit('map:move', map.getBounds());
      });

      function addDrawnItemsLayer(layer) {
        if (drawnItems) {
          if (drawnItems.getLayers().length > 0) {
            drawnItems.clearLayers();
          }
          layer.on('click', clickEvent => {
            clickEvent.target.editing._fireEdit();
          });
          layer.addTo(drawnItems);
        } else {
          layer.addTo(map);
        }
      }

      function addImageOverlay(imageUri, bbox) {
        // @todo use bbox
        let imageBounds = scope.options.coverage[0];
        L.imageOverlay(imageUri, imageBounds).addTo(map);
      }

      if (scope.options.draw) {
        // Initialise the FeatureGroup to store editable layers
        drawnItems = new L.FeatureGroup();

        let editOptions = false;
        if (scope.options.edit) {
          editOptions = Object.assign({
            featureGroup: drawnItems
          }, {
            edit: scope.options.edit
          }, {
            remove: scope.options.remove
          });
        }

        // Initialise the draw control and pass it the FeatureGroup of editable layers
        let drawControl = new L.Control.Draw({
          edit: editOptions,
          draw: Object.assign({
            polyline: false,
            polygon: false,
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: true
          }, scope.options.draw)
        });
        map.addControl(drawControl);
        map.addLayer(drawnItems);

        map.on('draw:created', e => {
          addDrawnItemsLayer(e.layer);
          scope.$emit('mapSelect', e.layer);
        });

        map.on('draw:edited', e => {
          e.layers.eachLayer(layer => {
            scope.$emit('mapSelect', layer);
          });
        });
      }


      if (scope.options.images) {
        // @todo loop...
        addImageOverlay(scope.options.images[0]);
      }

      $timeout(() => {
        map.invalidateSize();
      },10);

      // Update mapsize when switching formula tab. Lazily doing it on all tabs for now...
      // we could check if fs is our parent if necessary
      scope.$on('activate:fieldset', (fieldset) => {
        map.invalidateSize();
      });
      scope.$emit('map:move', map.getBounds());
    }
  };
  console.log("scope", scope);
  console.log("-----------");
};

module.exports = leaflet;
