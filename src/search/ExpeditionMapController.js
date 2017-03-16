'use strict';
// jshint bitwise: true
// globals L

function ExpeditionMapController($scope, $location, $timeout, $filter,
    NpolarEsriLeaflet, NpolarMessage, NpolarTranslate,
    ExpeditionTrack) {

  'ngInject';

  function initMap() {
    let esriBase = NpolarEsriLeaflet.uri({ epsg: 4326});
    NpolarEsriLeaflet.element = 'npolar-esri-leaflet-map';
    let map = NpolarEsriLeaflet.mapFactory(esriBase);
    //let crs = NpolarEsriLeaflet.crsFactory(esriBase);
    map.setView([80, 0], 4);

    let attribution = `Data: <a href="http://npolar.no">${ $filter('i18n')('npolar.no') }</a>`; //
    attribution += `: <a href="https://data.npolar.no/expedition">${ $filter('i18n')('Expeditions') }</a>`;
    attribution += ` (<a rel="license" href="http://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)`;
    map.attributionControl.addAttribution(attribution);

    $scope.layerControl = L.control.layers(null, null, { collapsed: false }).addTo(map);
    $scope.layerGroup = L.layerGroup();
    $scope.map = map;
  }

  // FIXME: Data lack cruise code (N-ICE2015 so need to add this or filter by the deployment dates...)
  function dailyPositions(expedition, interval='1h') {
    $scope.interval = interval;

    return ExpeditionTrack.feed({q: '',
      'filter-code': expedition,
      //'filter-object': 'ship',
      //'filter-latitude': '70..',
      [`date-${interval}`]: 'measured[latitude:longitude]',
      sort: 'measured',
      format: 'raw', limit: 1}).$promise.then(r => {

        //console.log(r);
        let d;
        if (r.hits.length > 0) {
          d = r.hits.hits[0]._source;
        }

        return r.aggregations[`${interval}-measured`].buckets.map(es => {
          return { type: 'Point', coordinates: [parseFloat(es.longitude.avg.toFixed(4)), parseFloat(es.latitude.avg.toFixed(4))],
            properties: { date: es.key_as_string }
          };

        });
    });
  }

  function pointFeature(point) {
    return { type: 'Feature', properties: point.properties,
      geometry: { coordinates: point.coordinates, type: 'Point' }
    };
  }

  function lineStringFeature(points, propertyFunction=(points => points[0].properties)) {

    let properties = propertyFunction(points);

    return { type: 'Feature', properties,
      geometry: {
        coordinates: points.map(point => point.coordinates),
        type: 'LineString'
      }
    };
  }

  // fillColor="#"+((1<<24)*Math.random()|0).toString(16);
  function hexColor(str, gamma=1, hash=5381) {
    let c, r, g, b;

    for(c = 0; c < str.length; ++c) {
      hash = ((hash << 5) + hash) + str.charCodeAt(c);
    }

    gamma = 1 - gamma;
    hash = ((hash * 0x6B43A95B) % 0xFFFFFF) >>> 0;
    r = (r = (((hash >> 16) & 0xFF))) + ((255 - r) * gamma) >>> 0;
    g = (g = (((hash >>  8) & 0xFF))) + ((255 - g) * gamma) >>> 0;
    b = (b = (((hash >>  0) & 0xFF))) + ((255 - b) * gamma) >>> 0;

    return "#" + ("000000" + ((r << 16) + (g << 8) + b).toString(16)).slice(-6);
  }


  function pointToLayer(feature, latlng) {

    let fillColor = hexColor(feature.properties.expedition);

    return L.circleMarker(latlng, { radius: 4,
      fillColor,
      color: "#000",
      weight: 1,
      opacity: 1,
      fillOpacity: 0.8
    });
  }

  function onEachFeature(feature, layer) {
    let properties;
    if (feature.geometry.type === 'Point') {
      properties = feature; // This includes coordinates for points...
    } else {
      properties = feature.properties;
      properties.days = feature.geometry.coordinates.length; // Assuming interval is 24h!
    }
    layer.bindPopup("<dl>"+JSON.stringify(properties)+"</dl>", { minWidth: "100%" });
	}


  try {

    // Wrap Leaflet map in a $timeout
    $timeout(() => {
      initMap();

      let geometry = $location.search().geometry || 'LineString';
      let interval = $location.search().interval || '2h';
      let expeditionsRegex = $location.search().type || /SVP/ ;
      $scope.types = ['AFAR', 'SVP', 'SNOW', 'CALIB', 'SIMBA'].sort();

      ExpeditionTrack.facetTerms('code').then(expeditions => {


        // could sort but would then need to sort activity, rather
        //let activity = e.activity.sort((a, b) => new Date(a.departed) > new Date(b.departed));
        /*sorted = expeditions.sort((a, b) => {
          console.debug('a',a.events, 'b', b);
          //b.level - a.level
          return true;
        });*/

        expeditions.forEach(expedition => {

          let color = hexColor(expedition.term);
          let style = {
              "color": color,
              "weight": 5,
              "opacity": 0.65,
              "radius": 10
          };

          dailyPositions(expedition.term, interval).then(points => {
            if (points.length > 0) {
              //code

              let features, featureCollection;
              if (geometry === 'Point') {
                features = points.map(point => pointFeature(point));
                featureCollection = L.geoJson({ type: 'FeatureCollection', features }, { pointToLayer, onEachFeature });
              } else {
                features = [lineStringFeature(points, (points) => points[0].properties)];
                featureCollection = L.geoJson(features, { pointToLayer, onEachFeature, style });
              }
              let owner = features[0].properties.owner;

              //if (new RegExp(expeditionsRegex, 'i').test(expedition.term)) {
                $scope.layerControl.addOverlay(featureCollection, `<span class="colorblock" style="background: ${color};"></span>${expedition.term}`);
                featureCollection.addTo($scope.map);
              //}
              }
          });

        });

      } );

    }); // end $timeout

  } catch (e) {
    NpolarMessage.error(e);
  }
}


module.exports = ExpeditionMapController;