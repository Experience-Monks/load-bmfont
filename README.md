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
- XML
- binary

Related modules:

- [parse-bmfont-ascii](https://www.npmjs.com/package/parse-bmfont-ascii)
- [parse-bmfont-xml](https://www.npmjs.com/package/parse-bmfont-xml)
- [read-bmfont-binary](https://www.npmjs.com/package/read-bmfont-binary)
- [write-bmfont-binary](https://www.npmjs.com/package/write-bmfont-binary)
- [bmfont2json](https://www.npmjs.com/package/bmfont2json)
- [bmfont-lato](https://www.npmjs.com/package/bmfont-lato)
- [layout-bmfont-text](https://www.npmjs.com/package/layout-bmfont-text)
- [three-bmfont-text](https://www.npmjs.com/package/three-bmfont-text)

## Usage

[![NPM](https://nodei.co/npm/load-bmfont.png)](https://www.npmjs.com/package/load-bmfont)

#### `load(opt, cb)`

Loads a BMFont file with the `opt` settings and fires the callback with `(err, font)` params once finished. If `opt` is a string, it is used as the URI. Otherwise the options can be:

- `uri` or `url` the path (in Node) or URI (in the browser)
- (node) options for `fs.readFile` such as `encoding`
- (browser) options for [xhr](https://github.com/Raynos/xhr) such as `responseType`

**Note:** To support binary format in the browser, the responseType needs to be set to `"arraybuffer"`:

```js
load({ 
  uri: 'Arial.bin', 
  responseType: 'arraybuffer' 
}, function(err, font) {
  console.log(font)
})
```

## License

MIT, see [LICENSE.md](http://github.com/Jam3/load-bmfont/blob/master/LICENSE.md) for details.
