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
              [$scope.latitude.value, $scope.longitude.value]
            ];
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
        coverage = [[[$scope.latitude.value, $scope.longitude.value]]];
      } else {
        coverage = [[[78.223333, 15.646944]]]
      }

      $scope.mapOptions = {
        draw: {
          marker: true,
          circlemarker:false
        },
        edit: {
          edit: true,
          remove: true
        },
        coverage: coverage
      };

      $scope.$on('mapSelect', (e, layer) => {
        changesDueToMapSelect = 4;
        $scope.latitude.value = layer._latlng.lat;
        $scope.longitude.value = layer._latlng.lng;
        rectLayer = layer;
        $timeout();
      });
    }
  };
};

module.exports = coverageDirective;
