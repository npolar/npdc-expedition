'use strict';
/*service */

// @ngInject
//Fetch from an API
var ExpeditionGetRIS = function($resource){

    //return $resource( 'https://www.researchinsvalbard.no/api/project/:search' , { search:'@search'}, {
	return $resource( 'http://www.researchinsvalbard.no/api/project/:search' , { search:'@search'}, {
    	query: {method: 'GET'}
    });
};

module.exports = ExpeditionGetRIS;