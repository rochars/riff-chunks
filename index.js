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
        "chunkId": byteData.fromBytes(
                buffer.slice(0, 4), 8, {"char": true}
            ),
        "chunkSize": byteData.fromBytes(
                buffer.slice(4, 8), 32, {'be': bigEndian}
            )[0],
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
    let len = buffer.length;
    let i = 12;
    let subChunkSize;
    let subChunkId;
    while(i < len) {
        subChunkId = byteData.fromBytes(
            buffer.slice(i, i + 4), 8, {"char": true});
        subChunkSize = byteData.fromBytes(
            buffer.slice(i + 4, i + 8), 32, {'be': bigEndian})[0];
        if (subChunkId == "LIST") {
            chunks.push({
                    "subChunkId": subChunkId,
                    "subChunkSize": subChunkSize,
                    "subChunks": getSubChunks(buffer.slice(i, i + subChunkSize), bigEndian)
                });
            i = i + 8 + subChunkSize;
        } else {
            chunks.push({
                    "subChunkId": subChunkId,
                    "subChunkSize": subChunkSize,
                    "subChunkData": buffer.slice(i + 8, i + 8 + subChunkSize)
                });
            i = i + 8 + subChunkSize;
        }
    }
    return chunks;
}

module.exports.getChunks = getChunks;
