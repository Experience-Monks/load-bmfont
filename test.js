var test = require('tape')
var load = require('./')
var expectedLato = require('./fnt/Lato-Regular-32.json')
var expectedNexa = require('./fnt/NexaLight32.json')
var expectedArial = require('./fnt/Arial.json')

test('should load ASCII font', function(t) {
  t.plan(1)
  load('fnt/Lato-Regular-32.fnt', function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expectedLato, 'matches expected JSON')
  })
})

test('should load XML font', function(t) {
  t.plan(1)
  load('fnt/NexaLight32.fnt', function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expectedNexa, 'matches expected JSON')
  })
})

test('should load JSON font', function(t) {
  t.plan(1)
  load('fnt/Lato-Regular-32.json', function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expectedLato, 'matches expected JSON')
  })
})

test('should load binary font', function(t) {
  t.plan(4)
  load({ url: 'fnt/Arial.bin', responseType: 'arraybuffer' }, function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font.info, expectedArial.info, 'matches expected JSON')
    t.deepEqual(font.common, expectedArial.common, 'matches expected JSON')
    t.deepEqual(font.chars, expectedArial.chars, 'matches expected JSON')
    t.deepEqual(font.kernings, expectedArial.kernings, 'matches expected JSON')
  })
})

test('should accept URI options', function(t) {
  t.plan(1)
  load({ encoding: 'utf8', uri: 'fnt/Lato-Regular-32.fnt' }, function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expectedLato, 'matches expected JSON')
  })
})

test('should error malformed font', function(t) {
  t.plan(1)
  load('fnt/Lato-Error.fnt', function(err, font) {
    if (err) 
      t.ok(err, 'fails with malformed json')
    else
      t.fail('was expecting this font to fail')
  })
})