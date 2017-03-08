#!/usr/bin/env ruby
# Fetch from the expedition database and create an XML document to fit with the
# OAIPMH server
#
# Author: srldl
#
########################################

require './server'
require './config'
require 'net/http'
require 'net/ssh'
require 'net/scp'
require 'time'
require 'date'
require 'json'
require 'nokogiri'

module Couch

  class ExpeditionToXml2

    #Set server
    fetchHost = Couch::Config::HOST1
    fetchPort = Couch::Config::PORT1
    fetchPassword = Couch::Config::PASSWORD1
    fetchUser = Couch::Config::USER1


    #Get ready to put into database
    server = Couch::Server.new(fetchHost, fetchPort)

    #Fetch from database
    db_res = server.get("/"+ Couch::Config::COUCH_EXPEDITION + "/_all_docs")

    #Get ids
    res = JSON.parse(db_res.body)

    #Iterate over Ids
    for i in 0..((res["rows"].size)-1)
     id =  res["rows"][i]["id"]
     #puts id


      #Fetch the entry with the id from database
      db_entry = server.get("/"+ Couch::Config::COUCH_EXPEDITION + "/"+id)
      entry = JSON.parse(db_entry.body)

      #Exclude all that are drafts and field trips
      if entry['draft'] == 'no'  && entry['type'] == 'cruise'

         #Create the file name with path
         xmlfile = 'seadatanet/' + id.to_s + '.xml'

        #If departure or return placename can be either: Longyearbyen, Tromsø, Ny-Ålesund, Troll (5 East), Cape Town
        #Country can be either Norway, South Africa or Antarctica




        #Ship can be Kronprins Haakon or RV Lance
        ship = (entry['platforms'][0]['name']).downcase
        if ship.include? "lance" then ship_id = "49L2"
        elsif  ship.include? "haakon" then ship_id = "kronprins haakom"
        else
           ship_id = "unknown"
        end



         #Bilde an xml file with Nokogiri, only requited fields are needed
         builder = Nokogiri::XML::Builder.new do |xml|
            xml.object {
              xml.id entry['id']
              xml.full_id  "urn.SDN.CSR.LOCAL." + entry['id'].to_s
              xml.code entry['code']
              xml.summary entry['summary']
              xml.start_date entry['start_date']
              xml.start_date_short entry['start_date'][0..9]
              xml.end_date entry['end_date']
              xml.end_date_short entry['end_date'][0..9]
              xml.departure_date entry['@departure_date']
              xml.return_date entry['@return_date']
              xml.departure_placename entry['@departure_placename']
              xml.departure_placename_id 'PLACE_dep'
              xml.return_placename entry['@return_placename']
              xml.return_placename_id 'PLACE_ret'
              xml.availability entry['availability']
              xml.created entry['created'][0..9]
              xml.updated entry['updated'][0..9]
              xml.departure_country 'Norway'
              xml.departure_country_id   'NOR'
              xml.return_country 'Norway'
              xml.return_country_id   'NOR'
              xml.ship entry['platforms'][0]['name']
              xml.ship_id ship_id
              if entry['people']
                xml.people { entry['people'].each { |v|
                  xml.person {
                    xml.first_name v['first_name']
                    xml.last_name v['last_name']
                    xml.organisation v['organisation']
                    xml.roles { v['roles'].each { |g| xml.role g }}
                  }
                }}
              end
              if entry['locations']
                xml.locations { entry['locations'].each { |v|
                  xml.location {
                    xml.south v['south']
                    xml.north v['north']
                    xml.east v['east']
                    xml.west v['west']
                    }
                   #   puts v['west'].to_s + "xxxxxxxx"
                }
                }
              end
        }
      end

      xmldoc = builder.to_xml
      #  puts xmldoc

        #Use xslt to convert
        doc = Nokogiri::XML(xmldoc)
        template = Nokogiri::XSLT(File.read('oai-pmh.xslt'))
        transformed_doc = template.transform(doc)
       # puts transformed_doc

      end #exclude all drafts

      File.open(xmlfile, 'w').write(transformed_doc)

 end #iterate over ids

end #class
end #module