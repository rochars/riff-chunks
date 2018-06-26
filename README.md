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

### ES6
```javascript
import riffChunks from 'riff-chunks';
let chunks = riffIndex(riffFileBuffer);
```

### Node
```javascript
const riffChunks = require("riff-chunks");
const fs = require("fs");
let chunks = riffChunks(fs.readFileSync("file.wav"));
```

### Browser
Use the compiled file in the */dist* folder:
```html
<script src="riff-chunks.min.js"></script>
<script>
var chunks = riffChunks(riffFileBuffer);
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
  import {riffIndex} from 'https://dev.jspm.io/riff-chunks';
  // ...
</script>
```

## API

### riffChunks(buffer)
```javascript
/**
 * Return the chunks in a RIFF/RIFX file.
 * @param {!Uint8Array|!Array<number>} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
function riffChunks(buffer) {}
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

The **chunkData** field contains the raw bytes of the chunk data.

## Distribution
This library is a ES6 module also distributed as a CommonJS module, UMD and a compiled script for browsers.

- The **CommonJS** is the one used by Node. It is served in the "main" field of package.json
- The **UMD** module is compatible with Node, AMD and browsers. It is served in the "browser" field.
- The **compiled dist** is browser-only and should be the one served by CDNs.
- The **ES6** dist is **riff-chunks.js**, served as "module" in package.json

You may load both **riff-chunks.umd.js** and **riff-chunks.min.js** in the browser with ```<script>``` tags.

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
