var xhr = require('xhr')
var noop = function(){}
var parse = require('parse-bmfont-ascii')

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

    //detect whether to use JSON or ASCII parsing
    var useJSON = false
    if (/json/.test(res.headers['content-type'])
        || body.trim().charAt(0) === '{') 
      useJSON = true  
    
    var result
    try {
      result = useJSON ? JSON.parse(body) : parse(body)
    } catch (e) {
      cb(new Error('error parsing font '+e.message))
      cb = noop
    }
    cb(null, result)
  })
}