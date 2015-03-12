# load-bmfont

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Loads an [AngelCode BMFont](http://www.angelcode.com/products/bmfont/) file from XHR (in browser) and fs (in Node), returning a [JSON representation](https://github.com/mattdesl/bmfont2json).

```js
var load = require('load-bmfont')

load('fonts/Arial-32.fnt', function(err, font) {
  if (err)
    throw err
  
  //The BMFont spec in JSON form
  console.log(font.common.lineHeight)
  console.log(font.info)
  console.log(font.chars)
  console.log(font.kernings)
})
```

Currently supported BMFont formats:

- ASCII (text)
- JSON

XML coming soon; first [parse-bmfont-xml](https://www.npmjs.com/package/parse-bmfont-xml) needs to use a lightweight browser version. 

Related modules:

- [parse-bmfont-ascii](https://www.npmjs.com/package/parse-bmfont-ascii)
- [parse-bmfont-xml](https://www.npmjs.com/package/parse-bmfont-xml)
- [bmfont2json](https://www.npmjs.com/package/bmfont2json)
- [bmfont-lato](https://www.npmjs.com/package/bmfont-lato)
- [layout-bmfont-text](https://www.npmjs.com/package/layout-bmfont-text)

## Usage

[![NPM](https://nodei.co/npm/load-bmfont.png)](https://www.npmjs.com/package/load-bmfont)

#### `load(path, cb)`

Loads a BMFont file at the given `path` and fires the callback with `(err, font)` params once finished.

In browser this uses XHR, in Node this uses `fs.readFile`.

## License

MIT, see [LICENSE.md](http://github.com/Jam3/load-bmfont/blob/master/LICENSE.md) for details.
