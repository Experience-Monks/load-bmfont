var test = require('tape')
var load = require('./')
var expectedLato = require('./fnt/Lato-Regular-32.json')
var expectedNexa = require('./fnt/NexaLight32.json')
var expectedArial = require('./fnt/Arial.json')

function run(opt, expected) {
  return function(t) {
    t.plan(1)
    load(opt, function(err, font) {
      if (err) 
        t.fail(err)
      t.deepEqual(font, expected, 'matches expected JSON')
    })
  }
}

test('should load ASCII font', run('fnt/Lato-Regular-32.fnt', expectedLato))
test('should load JSON font', run('fnt/Lato-Regular-32.json', expectedLato))
test('should load XML font', run('fnt/NexaLight32.fnt', expectedNexa))

test('should load binary font', run({ 
  uri: 'fnt/Arial.bin', 
  binary: true 
}, expectedArial))

test('should load JSON/ASCII even with binary true', run({ 
  uri: 'fnt/Lato-Regular-32.json', 
  binary: true 
}, expectedLato))

test('should load JSON/ASCII even with arraybuffer response', run({ 
  uri: 'fnt/Lato-Regular-32.json', 
  responseType: 'arraybuffer' 
}, expectedLato))

test('should accept Node options and support "url" alias', run({ 
  encoding: 'ascii', 
  url: 'fnt/Lato-Regular-32.fnt' 
}, expectedLato))

test('should error malformed font', function(t) {
  t.plan(1)
  load('fnt/Lato-Error.fnt', function(err, font) {
    if (err) 
      t.ok(err, 'fails with malformed json')
    else
      t.fail('was expecting this font to fail')
  })
})