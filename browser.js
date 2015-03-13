var xhr = require('xhr')
var noop = function(){}
var parseASCII = require('parse-bmfont-ascii')
var parseXML = require('parse-bmfont-xml')

module.exports = function(opt, cb) {
  cb = typeof cb === 'function' ? cb : noop

  if (typeof opt === 'string')
    opt = { uri: opt }
  else if (!opt)
    opt = {}

  xhr(opt, function(err, res, body) {
    if (err)
      return cb(err)
    if (!/^2/.test(res.statusCode))
      return cb(new Error('http status code: '+res.statusCode))
    if (!body)
      return cb(new Error('no body result'))

    body = body.trim()
    var result
    try {
      var type = res.headers['content-type']
      if (/json/.test(type)
          || body.charAt(0) === '{')
        result = JSON.parse(body)
      else if (/xml/.test(type) 
          || body.charAt(0) === '<')
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