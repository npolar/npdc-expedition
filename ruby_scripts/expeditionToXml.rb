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
      if entry['draft'] == 'no'  && entry['type'] == 'cruise'

      #Create the file name with path
      xmlfile = 'seadatanet/' + id.to_s + '.xml'

      #Read people part from the separate template - this may be repeated
      peo_chunk = ''
      entry['people'].each { |peo|
         #Get variables
         File.readlines('peopleTemplate', "%]").map(&:rstrip).each do |people|
              #Find which variable
              cutline = people[0..-4]
              newline = cutline.split('[%')
              #Insert into entry
              unless newline[1] == nil
                varname = (newline[1]).to_s
                puts varname.strip
                #insert variable into position
                inp = case varname.strip
                    when 'first_name' then peo['first_name']
                    when 'last_name' then  peo['last_name']
                    when 'organisation' then peo['organisation']
                    else peo['@country']
                end
              end #unless

              #Avoid break if inp is nil
              if inp == nil then inp = '' end
              #Add to the people chunk
              peo_chunk << newline[0] + inp
         end #people
      } #entry

      #Read people part from the separate template - this may be repeated
      loc_chunk = ''
      entry['locations'].each do |loc|
         File.readlines('locationsTemplate', "%]").map(&:rstrip).each do |locations|
              #Find which variable
              cutline = locations[0..-4]
              newline = cutline.split('[%')
              #Insert into entry
              unless newline[1] == nil
                varname = (newline[1]).to_s
                puts varname.strip
                #insert variable into position
                inp = case varname.strip
                    when 'west' then loc['west'].to_s
                    when 'north' then loc['north'].to_s
                    when 'east' then loc['east'].to_s
                    else loc['south'].to_s
                end
              end #unless

              #Avoid break if inp is nil
              if inp == nil then inp = '' end
              #Add to the people chunk
              loc_chunk << newline[0] + inp
         end
      end


      #Read chunk from template
      File.readlines('expeditionTemplate', "%]").map(&:rstrip).each do |line|

          puts "--------------------"
          cutline = line[0..-4]
          newline = cutline.split('[%')

          #If last chunk just add it
          if newline[1] == nil
            chunk = newline[0]
          else #Avoid last chunk since it is missing [% at end of template
             varname = (newline[1]).to_s
             puts varname.strip

             inp = case varname.strip
                #insert the people chunk
                when 'REPEAT_PEOPLE'
                    chunk = newline[0] + peo_chunk
                #insert the locations chunk
                when 'REPEAT_LOCATIONS'
                    chunk = newline[0] + loc_chunk
                when '@department_country' #This field is decided based on placename
                     if entry['@departure_placename'] == 'Cape Town'
                        chunk = newline[0] + 'South Africa'
                     elsif  entry['@departure_placename'] == 'Troll' || '5 East'
                        chunk = newline[0] + 'Antarctica'
                     else
                        chunk = newline[0] + 'Norway'
                     end
                when '@return_country' #This field is decided based on placename
                      if entry['@return_placename'] == 'Cape Town'
                        chunk = newline[0] + 'South Africa'
                      elsif  entry['@return_placename'] == 'Troll' || '5 East'
                        chunk = newline[0] + 'Antarctica'
                      else
                        chunk = newline[0] + 'Norway'
                      end
                when 'ship'
                        chunk = newline[0] + entry['platforms'][0]['name']
                else  #Just an ordinary tag to be replaced
                 chunk = newline[0] + (entry[varname.strip]).to_s
                 puts (entry[varname.strip]).to_s
             end
          end  #newline

          #Write to file
          open(xmlfile, 'a') { |g|
              g <<  chunk
          }
      end

   end #exclude all drafts

 end #iterate over ids

end #class
end #module
