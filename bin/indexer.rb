#! /usr/bin/env ruby

require 'pry'
require 'json'
require 'find'

content = []
dir = File.expand_path('.')

Find.find("#{dir}/docs/images") do |path|
  next unless File.exist?("#{path}/i.json")

  json = JSON.parse(File.read("#{path}/i.json"))
  json['name'] = path.split('/').last
  content << json
end

File.open("#{dir}/www/backend/index.json", 'w') do |f|
  f.write(content.to_json)
end
