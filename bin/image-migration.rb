#! /usr/bin/env ruby

require 'pry'
require 'json'
require 'open-uri'
require './filename-generator.rb'

json = [] #JSON.parse(File.read('../www/backend/index.json'))
raise 'you sure?'

json.each do |image|
  filename = generate
  dir = "#{File.expand_path('..')}/docs/images/#{filename}/"
  Dir.mkdir(dir)

  File.open("#{dir}i.mp4", 'w') do |f|
    open(image['url']) do |io|
      f.write(io.read)
    end
  end
  File.open("#{dir}i.json", 'w') do |f|
    obj = {
      titles: image['titles'],
      tags: image['tags']
    }
    obj[:nsfw] = image['nsfw'] if image['nsfw']
    f.write(obj.to_json)
  end
end
