#! /usr/bin/env ruby

require 'pry'
require 'json'

@library = JSON.parse(File.read('./office-library.json'))
@length = @library.length

def generate
  words = []
  4.times do
    word = nil
    while word.nil?
      n = rand(0..@length)
      w = @library[n]
      word = w unless words.include?(w)
    end
    words << word
  end
  words.join('')
end
