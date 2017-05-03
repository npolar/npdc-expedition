'use strict';

var ExpeditionJSONService = function() {

   //input example of several features
   var service = {};
   service.obj = [];

   return {
     getJSON: function() {
       return [service];
     },
     //Setter - if del is true, remove old
     setJSON: function(doc) {
        (service.obj).push(doc);
        console.log("service: " + JSON.stringify(service));
        return [service];
     }
  };
};


module.exports = ExpeditionJSONService;

