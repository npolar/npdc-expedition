'use strict';

function Expedition( $q, ExpeditionResource) {
  'ngInject';

  const schema = 'http://api.npolar.no/schema/expedition-1';

  ExpeditionResource.schema = schema;

  ExpeditionResource.create = function() {

      let ship_type = "researchVessel";
      let use_limitation = "none";
      let availability ="unrestricted";


      //let id = PublicationResource.randomUUID();
      let e = {  ship_type, use_limitation, availability
      };
      console.debug(e);
      return e;

    };

    // The hashi (v0) file object should be object with keys filename, url, [file_size, icon, extras].
    ExpeditionResource.hashiObject = function(link) {
      console.debug('hashiObject', link);
      // Ignore links that are not data

      return {
        url: link.href,
        filename: link.filename,
        file_size: link.length,
        md5sum: (link.hash||'md5:').split('md5:')[1],
        content_type: link.type
      };
    };

    ExpeditionResource.linkObject = function(hashi) {
      console.debug('linkObject', hashi);
      return {
       // rel: 'data',
        href: hashi.url,
        filename: hashi.filename,
        length: hashi.file_size,
        hash: 'md5:'+hashi.md5sum,
        type: hashi.content_type
      };
    };

  return ExpeditionResource;



}
module.exports = Expedition;