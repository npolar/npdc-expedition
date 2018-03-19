"use strict";

let coverageDirective = function () {
  "ngInject";

  return {
    template: require('./coverage.html'),
    controller($scope, $timeout) {
      "ngInject";

      let rectLayer;
      let changesDueToMapSelect = 0;

      let initField = function (field) {
        field.step = 0.01;
        $scope.$watch(field.id+'.value', n => {
          if (!changesDueToMapSelect && rectLayer) {
            let newBounds = [
              [$scope.latitude.value, $scope.longitude.value],
              [$scope.latitude.value, $scope.longitude.value]
            ];
            console.log("rectlayer", rectLayer.getBounds());
            rectLayer.setBounds(newBounds);
          }
          if (changesDueToMapSelect > 0) {
            changesDueToMapSelect--;
          }
        });
        $scope[field.id] = field;
      };

      $scope.field.fields.forEach(initField);

      let coverage;
      if ($scope.field.value && $scope.field.value.latitude) {
        coverage = [[[$scope.latitude.value, $scope.longitude.value],
          [$scope.latitude.value, $scope.longitude.value]]];
      }

      var redIcon = L.Icon.extend({
          options: {
            iconUrl: './edit/coverage/reddot.png',
            iconSize: [8, 8]
          }
  });


      //mapOptions object is initiating the wrapper
      $scope.mapOptions = {
        draw:{
          marker: { icon: new redIcon()},
          circlemarker: false
        },
        edit: {
          edit: true,
          remove: true
        },
        coverage: coverage,
        color: "#FF0000",
        initcoord: [78.223333, 15.646944],
        fullscreenControl: false
      };

      $scope.$on('mapSelect', (e, layer) => {
        changesDueToMapSelect = 4;
        $scope.latitude.value = Math.round(layer._latlng.lat * 100) / 100;
        $scope.longitude.value = Math.round(layer._latlng.lng * 100) / 100;
        rectLayer = layer;
        $timeout();
      });
    }
  };
};

module.exports = coverageDirective;
