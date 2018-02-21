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
  puts "season #{season[0]}"

  season[1].times do |episode|
    ep = episode + 1
    puts "episode #{ep}"

    digit = format('%02d', ep)
    url = "http://officequotes.net/no#{season[0]}-#{digit}.php"

    begin
      doc = Nokogiri::HTML(open(url))

      doc.css('td div.quote').each do |div|
        labels = div.css('b')
        next if labels.any? { |l| l.include?('Deleted Scene') }

        labels.each do |label|
          next unless label.content == 'Michael:'
          c = label.next_sibling.content

          phrases = c.strip.encode('UTF-8', invalid: :replace).split(/\W+/)
          phrases.each do |word|
            words << word if swears.include?(word) || word.length > 5
          end
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
