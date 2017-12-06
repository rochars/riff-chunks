# riff-chunks
Read and write the chunks of RIFF and RIFX files.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/riff-chunks

[![NPM version](https://img.shields.io/npm/v/riff-chunks.svg?style=for-the-badge)](https://www.npmjs.com/package/riff-chunks) [![Docs](https://img.shields.io/badge/docs-online-blue.svg?style=for-the-badge)](https://rochars.github.io/riff-chunks/index.html) [![JSPerf](https://img.shields.io/badge/jsperf-run-blue.svg?style=for-the-badge)](https://jsperf.com/riff-chunks)

## Install
```
npm install riff-chunks
```

## Use
```javascript
const riffChunks = require("riff-chunks");
const fs = require("fs");

let chunks = riffChunks.read(fs.readFileSync("file.wav"));
fs.writeFileSync("output.wav", riffChunks.write(chunks));
```

## riffChunks.read()
```javascript
/**
 * Get the chunks of a RIFF/RIFX file.
 * @param {Uint8Array|!Array<number>} buffer The file bytes.
 * @return {Object} The RIFF file chunks.
 */
function read(buffer) {}
```

**riffChunks.read()** returns a structure like this:
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
 * Write the bytes of a RIFF/RIFX file.
 * @param {Object} chunks A structure like the return of riffChunks.read().
 * @return {Uint8Array} The file bytes.
 */
function write(chunks) {}
```

## LICENSE
Copyright (c) 2017 Rafael da Silva Rocha.

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
