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

module Couch

  class Convertmms

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

      #Fetch the entry with the id from database
      db_entry = server.get("/"+ Couch::Config::COUCH_EXPEDITION + "/"+id)
      entry = JSON.parse(db_entry.body)

      #Exclude all that are drafts
      if entry['draft'] == 'no'

      #Create the file name with path
      xmlfile = 'xml/' + id.to_s + '.xml'



    #Read chunk from template
    File.readlines('expeditionTemplate', "%]").map(&:rstrip).each do |line|

          puts "--------------------"
          cutline = line[0..-4]
          newline = cutline.split('[%')

          @entry_name = ''
          #Avoid last chunk since it is missing [% at end of template
          unless newline[1] == nil
             varname = (newline[1]).to_s
             puts varname.strip
             @entry_name = (entry[varname.strip]).to_s
          end

          puts @entry_name

          open(xmlfile, 'a') { |g|
              g << newline[0] + @entry_name
          }
     end



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
   end #exclude all drafts

 end #iterate over ids

end #class
end #module
