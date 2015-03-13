var fs = require('fs')
var path = require('path')
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')
var mime = require('mime')
var noop = function(){}

module.exports = function loadFont(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) return cb(err)

    data = data.trim()
    var result
    try {
      if (/json/.test(mime.lookup(file))
          || data.charAt(0) === '{')
        result = JSON.parse(data)
      else if (/xml/.test(mime.lookup(file)) 
          || data.charAt(0) === '<')
        result = parseXML(data)
      else
        result = parseASCII(data)
    } catch (e) {
      cb(new Error('cannot parse font file '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}