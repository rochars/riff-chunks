'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var byteData = require('byte-data');

/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/** @private */
const uInt32_ = {bits: 32};
/** @type {number} */
let head_ = 0;

/**
 * Return the chunks in a RIFF/RIFX file.
 * @param {!Uint8Array} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
function riffChunks(buffer) {
    head_ = 0;
    let chunkId = getChunkId_(buffer, 0);
    uInt32_.be = chunkId == 'RIFX';
    let format = byteData.unpackString(buffer, 8, 4);
    head_ += 4;
    return {
        chunkId: chunkId,
        chunkSize: getChunkSize_(buffer, 0),
        format: format,
        subChunks: getSubChunksIndex_(buffer)
    };
}

/**
  * Find a chunk by its fourCC_ in a array of RIFF chunks.
  * @param {!Object} chunks The wav file chunks.
  * @param {string} chunkId The chunk fourCC_.
  * @param {boolean} multiple True if there may be multiple chunks
  *    with the same chunkId.
  * @return {?Array<!Object>}
  */
function findChunk(chunks, chunkId, multiple=false) {
  /** @type {!Array<!Object>} */
  let chunk = [];
  for (let i=0; i<chunks.length; i++) {
    if (chunks[i].chunkId == chunkId) {
      if (multiple) {
        chunk.push(chunks[i]);
      } else {
        return chunks[i];
      }
    }
  }
  if (chunkId == 'LIST') {
    return chunk.length ? chunk : null;
  }
  return null;
}

/**
 * Return the sub chunks of a RIFF file.
 * @param {!Uint8Array} buffer the RIFF file bytes.
 * @return {!Array<Object>} The subchunks of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunksIndex_(buffer) {
    let chunks = [];
    let i = head_;
    while(i <= buffer.length - 8) {
        chunks.push(getSubChunkIndex_(buffer, i));
        i += 8 + chunks[chunks.length - 1].chunkSize;
        i = i % 2 ? i + 1 : i;
    }
    return chunks;
}

/**
 * Return a sub chunk from a RIFF file.
 * @param {!Uint8Array} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {!Object} A subchunk of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunkIndex_(buffer, index) {
    let chunk = {
        chunkId: getChunkId_(buffer, index),
        chunkSize: getChunkSize_(buffer, index),
    };
    if (chunk.chunkId == 'LIST') {
        chunk.format = byteData.unpackString(buffer, index + 8, 4);
        head_ += 4;
        chunk.subChunks = getSubChunksIndex_(buffer);
    } else {
        let realChunkSize = chunk.chunkSize % 2 ?
            chunk.chunkSize + 1 : chunk.chunkSize;
        head_ = index + 8 + realChunkSize;
        chunk.chunkData = {
            start: index + 8,
            end: head_
        };
    }
    return chunk;
}

/**
 * Return the fourCC_ of a chunk.
 * @param {!Uint8Array} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {string} The id of the chunk.
 * @private
 */
function getChunkId_(buffer, index) {
    head_ += 4;
    return byteData.unpackString(buffer, index, 4);
}

/**
 * Return the size of a chunk.
 * @param {!Uint8Array} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {number} The size of the chunk without the id and size fields.
 * @private
 */
function getChunkSize_(buffer, index) {
    head_ += 4;
    return byteData.unpackFrom(buffer, uInt32_, index + 4);
}

exports.riffChunks = riffChunks;
exports.findChunk = findChunk;
