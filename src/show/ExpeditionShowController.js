'use strict';
/**
 *
 *
 * @ngInject
 */
var ExpeditionShowController = function ($scope, $controller, $q, $routeParams,
  Expedition, Inventory, Dataset, Project, Publication, npdcAppConfig) {
   'ngInject';

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Expedition;


  let uri = (expedition) => {
    let link = expedition.links.find(l => {
      return l.rel === "alternate" && (/html$/).test(l.type);
    });
    if (link) {
      return link.href.replace(/^http:/, "https:");
    } else {
      return `https://data.npolar.no/expedition/${ expedition.id }`;
    }
  };

  $scope.mapOptions = {};

  let show = function() {
    $scope.show().$promise.then((expedition) => {


      if (expedition.locations) {

         let bounds = (expedition.locations).map((locations) => [[locations.south, locations.west], [locations.north, locations.east]]);
         $scope.mapOptions.coverage = bounds;
         $scope.mapOptions.geojson = "geojson";


      }
      $scope.mapOptions.geometries = expedition.links.filter(l => l.type === "application/vnd.geo+json").map(l => l.href);



      $scope.links = expedition.links.filter(l => (l.rel !== "alternate" && l.rel !== "edit") && l.rel !== "data");


      //Convert from camelCase to human readable
      for(var j=0; j<($scope.document.research).length; j++){
         $scope.document.research[j].research_type = convert($scope.document.research[j].research_type);
      }

      //Convert from camelCase to human readable
      for(var i=0; i<($scope.document.people).length; i++){
      	 for(var k=0; k<($scope.document.people[i].roles).length; k++){
         $scope.document.people[i].roles[k] = convert($scope.document.people[i].roles[k]);
      }}


      $scope.alternate = expedition.links.filter(l => ((l.rel === "alternate" && l.type !== "text/html") || l.rel === "edit")).concat({
        href: `http://api.npolar.no/expedition/?q=&filter-id=${expedition.id}&format=json&variant=ld`,
        title: "DCAT (JSON-LD)",
        type: "application/ld+json"
      });


      $scope.uri = uri(expedition);



   /*  let relatedDatasets = Dataset.array({
        q: Expedition.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        'not-id': Expedition.id,
        op: 'OR'
      }).$promise;
      let relatedPublications = Publication.array({
        q: Expedition.title,
        fields: 'id,title,published_sort,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;
      let relatedProjects = Project.array({
        q: Expedition.title,
        fields: 'id,title,collection',
        score: true,
        limit: 5,
        op: 'OR'
      }).$promise;

      $q.all([relatedDatasets, relatedPublications, relatedProjects]).then(related => {
        $scope.related = related;
      }); */

    });

  };


  show();

};




/* convert from camelCase to lower case text*/
function convert(str) {
       var  positions = '';

       for(var i=0; i<(str).length; i++){
           if(str[i].match(/[A-Z]/) !== null){
             positions += " ";
             positions += str[i].toLowerCase();
        } else {
            positions += str[i];
        }
      }
        return positions;
       }

module.exports = ExpeditionShowController;


