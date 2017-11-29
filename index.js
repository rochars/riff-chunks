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
        "format": byteData.fromBytes(
                buffer.slice(8, 12), 8, {"char": true}
            ),
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
        let subChunkId = getChunkId(buffer, i);
        let subChunkSize = getChunkSize(buffer, i, bigEndian);
        if (subChunkId == "LIST") {
            chunks.push({
                    "subChunkId": subChunkId,
                    "subChunkSize": subChunkSize,
                    "subChunks": getSubChunks(
                        buffer.slice(i, i + subChunkSize), bigEndian)
                });
        } else {
            chunks.push({
                    "subChunkId": subChunkId,
                    "subChunkSize": subChunkSize,
                    "subChunkData": buffer.slice(i + 8, i + 8 + subChunkSize)
                });
        }
        i = i + 8 + subChunkSize;
    }
    return chunks;
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
