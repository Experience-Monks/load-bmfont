var fs = require('fs')
var path = require('path')
var parse = require('parse-bmfont-ascii')
var mime = require('mime')
var noop = function(){}

module.exports = function loadFont(file, cb) {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) return cb(err)

    var useJSON = false
    if (/json/.test(mime.lookup(file))
      || data.trim().charAt(0) === '{')
      useJSON = true

    var result
    try {
      result = useJSON ? JSON.parse(data) : parse(data)
    } catch (e) {
      cb(new Error('cannot parse font file '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}