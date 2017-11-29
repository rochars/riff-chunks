/*!
 * riff-chunks
 * Get the chunks of RIFF and RIFX files.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

const byteData = require("byte-data");

/**
 * Get the chunks of a RIFF file.
 * @param {Uint8Array|!Array<number>} buffer The RIFF file bytes.
 * @param {boolean} bigEndian true if its RIFX.
 * @return {Object}
 */
function getChunks(buffer, bigEndian=false) {
    return {
        "chunkId": getChunkId(buffer, 0),
        "chunkSize": getChunkSize(buffer, 0, bigEndian),
        "format": byteData.fromBytes(buffer.slice(8, 12), 8, byteData.str),
        "subChunks": getSubChunks(buffer, bigEndian)
    };
}

/**
 * Get the sub chunks of a RIFF file.
 * @param {Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {boolean} bigEndian true if its RIFX.
 * @return {Object}
 */
function getSubChunks(buffer, bigEndian) {
    let chunks = [];
    let i = 12;
    while(i < buffer.length) {
        chunks.push(getSubChunk(buffer, i, bigEndian));
        i += 8 + chunks[chunks.length - 1].subChunkSize;
    }
    return chunks;
}

function getSubChunk(buffer, index, bigEndian) {
    let chunk = {
        "subChunkId": getChunkId(buffer, index),
        "subChunkSize": getChunkSize(buffer, index, bigEndian)
    };
    if (chunk.subChunkId == "LIST") {
        chunk.subChunks = getSubChunks(
            buffer.slice(index, index + chunk.subChunkSize), bigEndian);
    } else {
        chunk.subChunkData = buffer.slice(
            index + 8, index + 8 + chunk.subChunkSize);
    }
    return chunk;
}

/**
 * Return the FourCC of a chunk.
 * @param {Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {string}
 */
function getChunkId(buffer, index) {
    return byteData.fromBytes(
        buffer.slice(index, index + 4), 8, {"char": true});
}

/**
 * Return the size of a chunk.
 * @param {Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {number}
 */
function getChunkSize(buffer, index, bigEndian) {
    return byteData.fromBytes(
        buffer.slice(index + 4, index + 8),
        32,
        {'be': bigEndian, "single": true});
}

module.exports.getChunks = getChunks;
