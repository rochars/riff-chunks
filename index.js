/*!
 * riff-chunks
 * Read and write the chunks of RIFF and RIFX files.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

const byteData = require("byte-data");

/**
 * Write the bytes of a RIFF/RIFX file.
 * @param {Object} chunks A structure like the return of riffChunks.read().
 * @param {boolean} bigEndian if the bytes should be big endian.
 *      "RIFX" chunkId will always set bigEndian to true.
 * @return {Array<number>|Uint8Array} The:
 *      - file bytes as Uint8Array when chunkId is "RIFF" or "RIFX" or
 *      - chunk bytes as Array<number> if chunkId is "LIST".
 */
function write(chunks, bigEndian=false) {
    if (!bigEndian) {
        bigEndian = chunks.chunkId == "RIFX";
    }
    let bytes =
        byteData.toBytes(chunks.chunkId, 8, byteData.char).concat(
                byteData.toBytes(chunks.chunkSize, 32, {'be': bigEndian}),
                byteData.toBytes(chunks.format, 8, byteData.char),
                writeSubChunks(chunks.subChunks, bigEndian)
            );
    if (chunks.chunkId == "RIFF" || chunks.chunkId == "RIFX" ) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Get the chunks of a RIFF/RIFX file.
 * @param {Uint8Array|!Array<number>} buffer The file bytes.
 * @return {Object}
 */
function read(buffer) {
    buffer = [].slice.call(buffer);
    let chunkId = getChunkId(buffer, 0);
    let bigEndian = (chunkId == "RIFX");
    let chunkSize = getChunkSize(buffer, 0, bigEndian);
    return {
        "chunkId": chunkId,
        "chunkSize": chunkSize,
        "format": byteData.fromBytes(buffer.slice(8, 12), 8, byteData.str),
        "subChunks": getSubChunks(buffer, bigEndian)
    };
}

/**
 * Write the sub chunks of a RIFF file.
 * @param {Array<Object>} chunks The chunks.
 * @param {boolean} bigEndian true if its RIFX.
 * @return {Array<number>}
 */
function writeSubChunks(chunks, bigEndian) {
    let subChunks = [];
    let i = 0;
    while (i < chunks.length) {
        if (chunks[i].chunkId == "LIST") {
            subChunks = subChunks.concat(write(chunks[i], bigEndian));
        } else {
            subChunks = subChunks.concat(
                byteData.toBytes(
                    chunks[i].chunkId, 8, byteData.char),
                byteData.toBytes(
                    chunks[i].chunkSize, 32, {'be': bigEndian}),
                chunks[i].chunkData
            );
        }
        i++;
    }
    return subChunks;
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
        i += 8 + chunks[chunks.length - 1].chunkSize;
    }
    return chunks;
}

function getSubChunk(buffer, index, bigEndian) {
    let chunk = {
        "chunkId": getChunkId(buffer, index),
        "chunkSize": getChunkSize(buffer, index, bigEndian)
    };
    if (chunk.chunkId == "LIST") {
        chunk.format = byteData.fromBytes(
            buffer.slice(8, 12), 8, byteData.str);
        chunk.subChunks = getSubChunks(
            buffer.slice(index, index + chunk.chunkSize), bigEndian);
    } else {
        chunk.chunkData = buffer.slice(index + 8, index + 8 + chunk.chunkSize);
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
        buffer.slice(index, index + 4), 8, byteData.str);
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
            {'be': bigEndian, "single": true}
        );
}

module.exports.read = read;
module.exports.write = write;
