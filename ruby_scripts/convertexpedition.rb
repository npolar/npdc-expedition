#!/usr/bin/env ruby
# Fetch from the old expedition database to the new one.
#
# Author: srldl
#
########################################

require './server'
require './config'
require 'net/http'
require 'json'

module Couch

  class ConvertExpedition

    #Set server
    fetchHost = Couch::Config::HOST2
    fetchPort = Couch::Config::PORT2
    fetchPassword = Couch::Config::PASSWORD2
    fetchUser = Couch::Config::USER2

    #Post to server
    postHost = Couch::Config::HOST2
    postPort = Couch::Config::PORT2
    postPassword = Couch::Config::PASSWORD2
    postUser = Couch::Config::USER2

    #Get ready to put into database
    server = Couch::Server.new(fetchHost, fetchPort)
    server2 = Couch::Server.new(postHost, postPort)

    #Fetch from database
    db_res = server.get("/"+ Couch::Config::COUCH_EXPEDITION_BKP + "/_all_docs")

    #Get ids
    res = JSON.parse(db_res.body)

    #Iterate over Ids
    for i in 0..((res["rows"].size)-1)
      id =  res["rows"][i]["id"]

      #Fetch the entry with the id from database
      db_entry = server.get("/"+ Couch::Config::COUCH_EXPEDITION_BKP + "/"+id)
      entry = JSON.parse(db_entry.body)

      #Platforms has a similar structure in both databases, can move directly
      @platforms = entry['platforms']
      @email = ''

      #Need to extract roles from people, convert then into new values
      @people_all = Array.new
      if entry['people']
      entry['people'].each do |peo|
         @roles = Array.new
         peo['roles'].each do |role|
            case role
               when "expeditionLeader"
                   rolename = "expedition/cruise leader"
               when "fieldAssistant"
                   rolename = "field assistant"
               when "principalInvestigator"
                   rolename = "principal investigator"
               when "processor"
                   rolename = "technitian"
               else
                   rolename =  "other"
               end
            @roles << rolename
        end #roles


        #insert into people
        @people =
            {
             :id => peo['id'],
             :first_name => peo['first_name'],
             :last_name => peo['last_name'],
             :organisation => peo['organisation'],
             :@country => 'NO',
             :roles => @roles
        }
        @email = @email + ' ' + peo['email']
        @people_all << @people
      end
    end


    #Get the locations
    @locations = nil
    @places_all = Array.new
    if entry['locations']

      entry['locations'].each do |loc|
          @places = [{
                 :placename => loc['placename'],
                 :predefined_area => loc['area']   #latitude, longitude  #geometry object
          }]
          #remove nil values
        #  @places.reject! {|k,v| v.nil?}

        north,south,east,west= nil
        if loc['geometry']
              #In the geoJSON object it could be either lat, long or north, south, east, west
              if loc['geometry']['properties']['latitude']
                  north,south = loc['geometry']['properties']['latitude'], loc['geometry']['properties']['latitude']
                  east,west = loc['geometry']['properties']['longitude'], loc['geometry']['properties']['longitude']
              elsif loc['geometry']['properties']['north']
                  north,south = loc['geometry']['properties']['north'], loc['geometry']['properties']['south']
                  east,west = loc['geometry']['properties']['east'], loc['geometry']['properties']['west']
              end
        end

        @locations = {
               :north =>  north,
               :east => east,
               :south => south,
               :west => west,
               :places => @places
        }
        #remove nil values
        @locations.reject! {|k,v| v.nil?}

        @places_all << @locations
      end #loc
    end

    #Assume all activity is research - probably true
    @activity = [ { :activity_type => 'research'}]

     #Take care of tags form the old database => store in comments
     tags, links, organisations, changes = ''
     if entry['tags']
         tags = (entry['tags']).join(",")
     end

    #Easiest way is to convert to a json stub
    if entry['links']
     links=entry['links'].to_json
    end
    if entry['organisations']
     organisations=entry['organisations'].to_json
    end
    if entry['changes']
     changes=entry['changes'].to_json
    end


    #Now convert from the old database to the new one
    @new_entry = {
          :id => entry["id"],
          :_id => entry["_id"],
          :schema => "http://api.npolar.no/schema/expedition-1",
          :lang => "en",
          :code => entry["code"],
          :activity => @activity,
          :type => (entry["type"] == "traverse")? "expedition": "cruise",
          :summary => entry["summary"],
          :platforms => @platforms,
          :start_date => entry['activity'][0]['departed'],
          :end_date => entry['activity'][0]['returned'],
          :@departure_placename => entry['activity'][0]['departure_placename'],
          :@return_placename => entry['activity'][0]['return_placename'],
          :people => @people_all,
          :availability => "by negotiation",
          :locations => @places_all,
          :draft => entry["draft"],
          :collection => "expedition",
          :comment => "mails:" + @email + " tags: " + tags + " links: " + links.to_s + " organisations " + organisations.to_s + " changes: " + changes.to_s,
          :created => entry["created"],
          :updated => entry["updated"],
          :created_by =>  entry["created_by"],
          :updated_by => entry["updated_by"]
    }

    #remove nil values
    @new_entry.reject! {|k,v| v.nil?}


    #Post coursetype
    doc = @new_entry.to_json
    puts doc

   # res2 = server2.post("/"+ Couch::Config::COUCH_EXPEDITION + "/", doc, postUser, postPassword)

 end #iterate over ids

end #class
end #module
