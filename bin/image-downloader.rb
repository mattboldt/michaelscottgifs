require 'open-uri'



open('image.png', 'wb') do |file|
  file << open('http://example.com/image.png').read
end
