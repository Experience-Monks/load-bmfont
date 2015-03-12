var test = require('tape')
var load = require('./')
var expected = require('./fnt/Lato-Regular-32.json')

test('should load ASCII font', function(t) {
  t.plan(1)
  load('fnt/Lato-Regular-32.fnt', function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expected, 'matches expected JSON')
  })
})

test('should load JSON font', function(t) {
  t.plan(1)
  load('fnt/Lato-Regular-32.json', function(err, font) {
    if (err) 
      t.fail(err)
    t.deepEqual(font, expected, 'matches expected JSON')
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