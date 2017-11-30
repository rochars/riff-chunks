# riff-chunks
Get the chunks of RIFF and RIFX files.  
Copyright (c) 2017 Rafael da Silva Rocha.  
https://github.com/rochars/riff-chunks

[![Travis](https://img.shields.io/travis/rochars/riff-chunks.svg?style=for-the-badge)](https://travis-ci.org/rochars/riff-chunks) [![AppVeyor](https://img.shields.io/appveyor/ci/rochars/riff-chunks.svg?style=for-the-badge&logo=appveyor)](https://ci.appveyor.com/project/rochars/riff-chunks) [![Codecov](https://img.shields.io/codecov/c/github/rochars/riff-chunks.svg?style=for-the-badge)](https://codecov.io/gh/rochars/riff-chunks) [![NPM version](https://img.shields.io/npm/v/riff-chunks.svg?style=for-the-badge)](https://www.npmjs.com/package/riff-chunks)

## Install
```
npm install riff-chunks
```

## Use
```javascript
const riffChunks = require("riff-chunks");
const fs = require("fs");
let chunks = riffChunks(fs.readFileSync('file.wav'));
```

## riffChunks()
```javascript
/**
 * Get the chunks of a RIFF/RIFX file.
 * @param {Uint8Array|!Array<number>} buffer The file bytes.
 * @return {Object}
 */
function riffChunks(buffer) {}
```

**riffChunks()** returns a structure like this:
```
{
    "chunkId": string,
    "chunkSize": number,
    "format": string,
    "subChunks": [
        {
            "subChunkId": string,
            "subChunkSize": number,
            "subChunkData": Array<number>
        },
    ]
}
```

The **subChunkData** field contains the raw bytes of the chunk data.

## Browser
```html
<script src="riff-chunks-min.js"></script>
<script>
    var chunks = riffChunks(waveFile);
</script>
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
