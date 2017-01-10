#!/usr/bin/env ruby
# Fetch from the old expedition database to the new one.
#
# Author: srldl
#
########################################

require './server'
require './config'
require 'net/http'
require 'net/ssh'
require 'net/scp'
require 'mdb'
require 'time'
require 'date'
require 'json'
require 'oci8'
require 'net-ldap'
require 'rmagick'
require 'digest'


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


      @people_all = Array.new
      if entry['people']
      entry['people'].each do |peo|
         peo['roles'].each do |role|
            @roles = Array.new
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
            puts rolename
            @roles << rolename
        end #roles

        @people = {
          :items => {
             :id => peo['id'],
             :first_name => peo['first_name'],
             :last_name => peo['last_name'],
             :organisation => peo['organisation'],
             :roles => @roles
        }}
        @people_all << @people
      end
    end
      puts entry['id'], @people_all




=begin

      # puts entry
      unless entry['att'] == nil
           key, value = entry['att'].first
           puts value
           puts value['content_type']
      end

      @places_all = Array.new

      entry['locations'].each do |loc|
          @places = {
              :items => {
                 :placename => loc['placename'],
                 :predefined_area => loc['area']
          }}

          @locations = {
              :items => {
                :north => loc['geometry']['latitude'],
                :east => loc['geometry']['longitude'],
                :south => loc['geometry']['latitude'],
                :west => loc['geometry']['longitude'],
                :places => @places
        }}
      end #loc

      @places_all << @locations

      puts @places_all
=end


=begin      #Now convert from the old database to the new one
      @new_entry = {
          :schema => "http://api.npolar.no/schema/expedition",
          :lang => "en",
          :code => entry["code"],
          :type => (entry["type"] == "traverse")? "expedition": "cruise",
          :summary => entry["summary"],
          :tags => @tags,
          :platforms => @platforms,
          :start_date =>
          :end_date =>
          :@departure_placename => entry['activity']['departure_placename'],
          :@return_placename => entry['activity']['return_placename'],
          :activity => @activity,
          :people => @people,
          :availability => "by negotiation",
          :locations => @locations,
          :draft => "no",
          :collection => "expedition",
          :comment => "Old id:" + entry["id"] .....,
          :created => entry["created"],
          :updated => entry["updated"],
          :created_by =>  entry["created_by"],
          :updated_by => entry["updated_by"],
          :_id =>
      }


=end


          #Upload from ruby_scripts to remote server
       #   Net::SCP.start(Couch::Config::HOST1, Couch::Config::USER2, :password => Couch::Config::PASSWORD1 ) do |scp|
          #Create a remote directory

          # puts "SCP started"
        # scp.upload!("/home/siri/projects/ruby_scripts/images/" + uuid + "/" + pic[2], "/srv/hashi/storage/sighting/restricted/" + uuid + "/", :recursive => true)
          # puts "scp started2"
        # scp.upload!("/home/siri/projects/ruby_scripts/thumbnails/" + uuid + "/" + pic[2], "/srv/hashi/storage/sighting/restricted/" + uuid +"/thumb_" + pic[2], :recursive => true)
       #  end





    #Post coursetype
  #  doc = @entry.to_json

 #   res = server.post("/"+ Couch::Config::COUCH_DB_NAME + "/", doc, postUser, postPassword)

 end #iterate over ids

end #class
end #module
