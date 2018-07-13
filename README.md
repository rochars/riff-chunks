# riff-chunks
Copyright (c) 2017-2018 Rafael da Silva Rocha.  
https://github.com/rochars/riff-chunks

[![NPM version](https://img.shields.io/npm/v/riff-chunks.svg?style=for-the-badge)](https://www.npmjs.com/package/riff-chunks) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/riff-chunks/index.html)  
[![Codecov](https://img.shields.io/codecov/c/github/rochars/riff-chunks.svg?style=flat-square)](https://codecov.io/gh/rochars/riff-chunks) [![Unix Build](https://img.shields.io/travis/rochars/riff-chunks.svg?style=flat-square)](https://travis-ci.org/rochars/riff-chunks) [![Windows Build](https://img.shields.io/appveyor/ci/rochars/riff-chunks.svg?style=flat-square&logo=appveyor)](https://ci.appveyor.com/project/rochars/riff-chunks) [![Scrutinizer](https://img.shields.io/scrutinizer/g/rochars/riff-chunks.svg?style=flat-square&logo=scrutinizer)](https://scrutinizer-ci.com/g/rochars/riff-chunks/)

Parse the chunks of RIFF and RIFX files.

## Install
```
npm install riff-chunks
```

## Use

### Node
```javascript
const riffChunks = require("riff-chunks").riffChunks;
const fs = require("fs");
let chunks = riffChunks(fs.readFileSync("file.wav"));
```

### ES6
```javascript
import {riffChunks} from 'riff-chunks';
let chunks = riffChunks(riffFileBuffer);
```

### Browser
Use the compiled file in the */dist* folder:
```html
<script src="riff-chunks.min.js"></script>
<script>
var chunks = riffChunks.riffChunks(riffFileBuffer);
</script>
```

Or get it from the [jsDelivr](https://www.jsdelivr.com) CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/riff-chunks@8"></script>
```

Or get it from [unpkg](https://www.unpkg.com):
```html
<script src="https://unpkg.com/riff-chunks@8"></script>
```

Or as a ES6 module in modern browsers from [jspm](https://jspm.io):
```html
<script type="module">
  import {riffChunks} from 'https://dev.jspm.io/riff-chunks';
  // ...
</script>
```

## API

### riffChunks(buffer)
```javascript
/**
 * Return the chunks in a RIFF/RIFX file.
 * @param {!Uint8Array} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
export function riffChunks(buffer) {}

/**
 * Find a chunk by its fourCC_ in a array of RIFF chunks.
 * @param {!Object} chunks The wav file chunks.
 * @param {string} chunkId The chunk fourCC_.
 * @param {boolean} multiple True if there may be multiple chunks
 *    with the same chunkId.
 * @return {?Array<!Object>}
 * @private
 */
export function findChunk(chunks, chunkId, multiple=false) {}
```

**riffChunks()** returns a object like this:
```
{
    "chunkId": string,
    "chunkSize": number,
    "format": string,
    "subChunks": [
        {
            "chunkId": string,
            "chunkSize": number,
            "chunkData": {
                "start": number,
                "end": number
            }
        },
    ]
}
```

## Distribution
This library is a ES module also distributed as a CommonJS module, UMD module and a compiled script for browsers. It works out of the box in Node when installed with ```npm install riff-chunks```.

### If you are using this lib in a browser:

You may load both **./dist/riff-chunks.umd.js** and **./dist/riff-chunks.min.js** in the browser with ```<script>``` tags. Ideally you should use **riff-chunks.min.js**. You can load it via the https://unpkg.com and https://www.jsdelivr.com/ CDNs:

[unpkg](https://unpkg.com/riff-chunks):
```html
<script src="https://unpkg.com/riff-chunks"></script>
```

[jsDelivr](https://cdn.jsdelivr.net/npm/riff-chunks):
```html
<script src="https://cdn.jsdelivr.net/npm/riff-chunks"></script>
```

### If you are using this lib as a dependency:

- The **CommonJS** dist is **./dist/riff-chunks.cjs.js**. It is the dist file used by Node. It is served in the "main" field of package.json and is the source you are running when you **npm install riff-chunks**. It is not compiled or minified.

- The **UMD** module is **./dist/riff-chunks.umd.js**. It is transpiled to ES5 and compatible with Node, AMD and browsers. It is served in the "browser" field of package.json.

- The **browser-only** dist is **./dist/riff-chunks.min.js**. It is transpiled to ES5 and compiled. It is used in the "unpkg" and "jsdelivr" fields of package.json.

- The **ES6 bundle** is **./dist/riff-chunks.js**, served as "es2015" in package.json. It is not compiled/minified.

- **./main.js** is served as "module" in package.json. This should be the entry point for bundlers.

If your module bundler is using "browser" as the entry point **your dist should work the same** but will be a larger file.

## LICENSE
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
