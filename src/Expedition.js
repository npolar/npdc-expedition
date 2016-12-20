'use strict';

function Expedition( NpolarApiSecurity, ExpeditionResource) {
  'ngInject';

  const schema = 'http://api.npolar.no/schema/expedition-1';

  return Object.assign(ExpeditionResource, {

     schema,

     create: function() {

      let availability ="by negotiation";
      let lang = "en";


      //let id = PublicationResource.randomUUID();
      let e = {  availability, lang };
      console.debug(e);
      return e;

    },

     hashiObject: function(file) {
       console.debug('hashiObject', file);
      return {
        url: file.uri,
        filename: file.filename,
        // icon
        length: file.file_size,
        md5sum: (file.hash||'md5:').split('md5:')[1],
        content_type: file.type
      };
    },

  fileObject: function(hashi) {
      console.debug('fileObject', hashi);
      return {
        uri: hashi.url,
        filename: hashi.filename,
        length: hashi.file_size,
        hash: 'md5:'+hashi.md5sum,
        type: hashi.content_type
      };
    }

 });

}
module.exports = Expedition;
