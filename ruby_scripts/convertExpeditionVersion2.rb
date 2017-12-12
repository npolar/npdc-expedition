#!/usr/bin/env ruby
# Convert entries from old database schema to new ones
#
# Author: srldl
#
########################################

require '../server'
require '../config'
require 'net/http'
require 'net/ssh'
require 'net/scp'
require 'time'
require 'date'
require 'json'
require 'openssl'


module Couch

  class ConvertExpedition

    #Set server
    host = Couch::Config::HOST3
    port = Couch::Config::PORT3
    password = Couch::Config::PASSWORD3
    user = Couch::Config::USER3
    auth = Couch::Config::AUTH3
    database = "expedition"


    #Get ready to put into database
    server = Couch::Server.new(host, port)

    #Fetch a UUIDs from couchdb
    db_res = server.get("/"+ database + "/?q=&fields=_id&format=json&variant=array&limit=all")

    #Get ids
    res = JSON.parse(db_res.body)

    #Iterate over the Ids from Couch
    for i in 0..((res.size)-1)

      id =  res[i]["_id"]


      #Fetch the entry with the id from database
      db_entry = server.get("/"+ database + "/"+id)
      @entry = JSON.parse(db_entry.body)

      if @entry['@departure_placename']
          @entry['comment'] << " Departure placename:" + @entry['@departure_placename']
          @entry.tap { |h| h.delete(:@departure_placename) }
      end

      if @entry['@return_placename']
          @entry['comment'] << " Return placename:" + @entry['@return_placename']
          @entry.tap { |h| h.delete("@return_placename") }
      end

      if @entry['platforms']['name']
         @entry['ship'] = @entry['platforms']['name']
         @entry.tap { |h| h.delete("platforms") }
      end

      if @entry['locations']
          #Create new location object from first entry
          loc = {'north' => @entry['locations'][0]['north'],
                 'south' => @entry['locations'][0]['south'],
                 'east' => @entry['locations'][0]['east'],
                 'west' => @entry['locations'][0]['west'],
                 'placename' => @entry['locations'][0]['placename']}
          @entry['location'] = loc
          #Move the other entries to comment
      end

      if @entry['people']
         if @entry['people'][0]['roles'][0] === nil
         elsif  @entry['people'][0]['roles'][0] !== "expedition/cruise leader" || "other"
              @entry['people'][0]['roles'][0] = "other"
         end
      end

      #Move all activites to comment
      if @entry['activity']
          @entry['comment'] = " Activity:" + @entry['activity'].to_json
      end

      puts @entry
      exit
    end




       #delete lat,lng

       @entry.tap { |k| k.delete("longitude") }
       @entry.tap { |k| k.delete("geometry") }
       @entry[:geometry] = @geometry_collection


       #remove nil values
       @entry.reject! {|k,v| v.nil?}

       #Post coursetype
       doc = @entry.to_json
       puts doc

       #Post to server
       #@uri = URI.parse('http://api-test.data.npolar.no/seabird-colony')
       @uri = URI.parse('http://api.npolar.no/seabird-colony')
       http = Net::HTTP.new(@uri.host, @uri.port)
       req = Net::HTTP::Post.new(@uri.path,{'Authorization' => auth, 'Content-Type' => 'application/json' })
       req.body = doc
       req.basic_auth(user, password)
       res2 = http.request(req)
       puts (res2.header).inspect
      # puts (res2.body).inspect


    end
    end
=end


end #class
end #module
