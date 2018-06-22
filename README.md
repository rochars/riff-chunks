# riff-chunks
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/riff-chunks

[![NPM version](https://img.shields.io/npm/v/riff-chunks.svg?style=for-the-badge)](https://www.npmjs.com/package/riff-chunks) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/riff-chunks/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/riff-chunks.svg?style=flat-square)](https://codecov.io/gh/rochars/riff-chunks) [![Unix Build](https://img.shields.io/travis/rochars/riff-chunks.svg?style=flat-square)](https://travis-ci.org/rochars/riff-chunks) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/riff-chunks.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/riff-chunks) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/riff-chunks.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/riff-chunks/)

## About
Read and write the chunks of RIFF and RIFX files.

## Install
```
npm install riff-chunks
```

## Browser
Use the compiled file in the */dist* folder:
```html
<script src="riff-chunks.min.js"></script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/riff-chunks@7"></script>
```

Or get it from [unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/riff-chunks@7"></script>
```

## Example
```javascript
const riffChunks = require("riff-chunks");
const fs = require("fs");

let chunks = riffChunks.read(fs.readFileSync("file.wav"));
fs.writeFileSync("output.wav", riffChunks.write(chunks));
```

## API

## riffChunks.read()
```javascript
/**
 * Return the chunks of a RIFF/RIFX file.
 * @param {!Uint8Array|!Array<number>} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
function read(buffer) {}
```

**riffChunks.read()** returns a object like this:
```
{
    "chunkId": string,
    "chunkSize": number,
    "format": string,
    "subChunks": [
        {
            "chunkId": string,
            "chunkSize": number,
            "chunkData": Array<number>
        },
    ]
}
```

The **chunkData** field contains the raw bytes of the chunk data.

## riffChunks.write()
```javascript
/**
 * Pack a RIFF/RIFX file.
 * @param {!Object} chunks A object like the return of riffChunks.read().
 * @param {boolean} list An optional param indicating if the chunk is LIST.
 *      "LIST" chunks should not be rendered as Uint8Array.
 * @return {!Array<number>|!Uint8Array} The bytes as Uint8Array when chunkId is
 *      "RIFF"/"RIFX" or as Array<number> when chunkId is "LIST".
 */
function write(chunks) {}
```

## Distribution
This library is implemented as a ES6 module and also distributed as a CommonJS module, UMD module and a compiled script for browsers. If your system does not pick one automatically for you, you can pick one in the **dist/** folder.
- The CommonJS is the one used by Node. It is served in the "main" field of this library's package.json
- The UMD module is compatible with Node, AMD and browsers. It is served in the "browser" field.
- The compiled dist is browser-only and should be the one served by CDNs.
- The "module" field points to "./index.js" and should be the default entry point.

If you are using a module bundler to compile a module that depends on this library you might need to specify what is the correct entry point as some bundlers will assume "browser". In general, you should point to "module".

### webpack example:
```javascript
module.exports = {
  entry: './index.js',
  resolve: {
    // tells webpack to use 'module' or 'main'
    // not 'browser'
    mainFields: ['module', 'main']
  },
  ...
};
```

## Legal
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Frochars%2Friff-chunks.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Frochars%2Friff-chunks?ref=badge_large)

### LICENSE
Copyright (c) 2017-2018 Rafael da Silva Rocha.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
