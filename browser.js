var xhr = require('xhr')
var noop = function(){}
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')
var readBinary = require('read-bmfont-binary')
var isBinaryFormat = require('./lib/is-binary')

module.exports = function(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}
  
  var response = opt.responseType
  xhr(opt, function(err, res, body) {
    if (err)
      return cb(err)
    if (!/^2/.test(res.statusCode))
      return cb(new Error('http status code: '+res.statusCode))
    if (!body)
      return cb(new Error('no body result'))

    var buffer = isArrayBuffer(body)
    var binary = false 

    //check if the response type is ArrayBuffer
    if (buffer) {
      var array = new Uint8Array(body)
      body = new Buffer(array)
    }

    //the string or Buffer has the correct header..
    if (isBinaryFormat(body)) {
      //needs TextDecode, not yet supported
      if (typeof body === 'string') {
        throw new Error('for binary in browser, '+
                  'use responseType: "arraybuffer"')
      } 
      //binary should work fine
      else { 
        binary = true
      }
    }

    if (!binary)
      body = body.toString('utf8').trim()

    var result
    try {
      var type = res.headers['content-type']
      if (binary)
        result = readBinary(body)
      else if (/json/.test(type) || body.charAt(0) === '{')
        result = JSON.parse(body)
      else if (/xml/.test(type)  || body.charAt(0) === '<')
        result = parseXML(body)
      else
        result = parseASCII(body)
    } catch (e) {
      cb(new Error('error parsing font '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}

function isArrayBuffer(arr) {
  var str = Object.prototype.toString
  return str.call(arr) === '[object ArrayBuffer]'
}