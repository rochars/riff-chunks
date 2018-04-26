/*!
 * riff-chunks
 * Read and write the chunks of RIFF and RIFX files.
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

/** @private */
const byteData = require("byte-data");
/** @private */
const chr = byteData.chr;
/** @private */
let uInt32 = byteData.uInt32;


/**
 * Write the bytes of a RIFF/RIFX file.
 * @param {Object} chunks A structure like the return of riffChunks.read().
 * @return {Uint8Array} The file bytes as Uint8Array when
 *      chunkId is "RIFF" or "RIFX" or the chunk bytes as Array<number>
 *      when chunkId is "LIST".
 */
function write(chunks) {
    uInt32.be = chunks["chunkId"] === "RIFX";
    let bytes =
        byteData.packArray(chunks["chunkId"], chr).concat(
                byteData.pack(chunks["chunkSize"], uInt32),
                byteData.packArray(chunks["format"], chr),
                writeSubChunks_(chunks["subChunks"])
            );
    if (chunks["chunkId"] === "RIFF" || chunks["chunkId"] === "RIFX" ) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Get the chunks of a RIFF/RIFX file.
 * @param {Uint8Array|Array<number>} buffer The file bytes.
 * @return {Object} The chunk.
 */
function read(buffer) {
    buffer = [].slice.call(buffer);
    let chunkId = getChunkId_(buffer, 0);
    uInt32.be = chunkId === "RIFX";
    return {
        "chunkId": chunkId,
        "chunkSize": getChunkSize_(buffer, 0),
        "format": byteData.unpackArray(buffer.slice(8, 12), chr),
        "subChunks": getSubChunks_(buffer)
    };
}

/**
 * Write the sub chunks of a RIFF file.
 * @param {Array<Object>} chunks The chunks.
 * @return {Array<number>} The chunk bytes.
 * @private
 */
function writeSubChunks_(chunks) {
    let subChunks = [];
    let i = 0;
    while (i < chunks.length) {
        if (chunks[i]["chunkId"] === "LIST") {
            subChunks = subChunks.concat(write(chunks[i]));
        } else {
            subChunks = subChunks.concat(
                byteData.packArray(chunks[i]["chunkId"], chr),
                byteData.pack(chunks[i]["chunkSize"], uInt32),
                chunks[i]["chunkData"]
            );
        }
        i++;
    }
    return subChunks;
}

/**
 * Get the sub chunks of a RIFF file.
 * @param {Uint8Array|Array<number>} buffer the RIFF file bytes.
 * @return {Object} The subchunks of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunks_(buffer) {
    let chunks = [];
    let i = 12;
    while(i < buffer.length) {
        chunks.push(getSubChunk_(buffer, i));
        i += 8 + chunks[chunks.length - 1]["chunkSize"];
    }
    return chunks;
}

/**
 * Get a sub chunk from a RIFF file.
 * @param {Uint8Array|Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {Object} A subchunk of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunk_(buffer, index) {
    let chunk = {
        "chunkId": getChunkId_(buffer, index),
        "chunkSize": getChunkSize_(buffer, index)
    };
    if (chunk["chunkId"] === "LIST") {
        chunk["format"] = byteData.unpackArray(buffer.slice(8, 12), chr);
        chunk["subChunks"] = getSubChunks_(
            buffer.slice(index, index + chunk["chunkSize"]));
    } else {
        chunk["chunkData"] = buffer.slice(
            index + 8, index + 8 + chunk["chunkSize"]);
    }
    return chunk;
}

/**
 * Return the FourCC of a chunk.
 * @param {Uint8Array|Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {string} The id of the chunk.
 * @private
 */
function getChunkId_(buffer, index) {
    return byteData.unpackArray(buffer.slice(index, index + 4), chr);
}

/**
 * Return the size of a chunk.
 * @param {Uint8Array|Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {number} The size of the chunk without the id and size fields.
 * @private
 */
function getChunkSize_(buffer, index) {
    return byteData.unpack(buffer.slice(index + 4, index + 8), uInt32);
}

module.exports.read = read;
module.exports.write = write;
