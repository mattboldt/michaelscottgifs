#! /usr/bin/env ruby
# encoding: utf-8

require 'nokogiri'
require 'open-uri'
require 'pry'
require 'active_support/all'
require 'json'

SEASONS_WITH_MIKE = [
  [1, 6], [2, 22], [3, 23], [4, 14], [5, 26], [6, 24], [7, 21]
].freeze

# SEASONS_WITH_MIKE = [[1, 6]].freeze

words = []
swears = []
open('https://rawgit.com/raymondjavaxx/swearjar-node/master/lib/config/en_US.json') do |io|
  swears = JSON.parse(io.read).keys
end

SEASONS_WITH_MIKE.each do |season|
  season[1].times do |episode|
    digit = format('%02d', episode + 1)
    url = "http://officequotes.net/no#{season[0]}-#{digit}.php"

    begin
      doc = Nokogiri::HTML(open(url))

      doc.css('td div.quote').each do |div|
        next if div.content.include?('Deleted Scene')

        phrases = div.content.strip.encode('UTF-8', invalid: :replace).split(/\W+/)
        phrases.each do |word|
          words << word if swears.include?(word) || word.length > 5
        end
      end
    rescue OpenURI::HTTPError => e
      puts ' :( ' + e.message
    end
  end
end

words = words
        .flatten
        .map(&:downcase)
        .uniq
        .sort
        .map(&:titleize)

File.write('./office-library.json', words.to_json)
