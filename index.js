/*
 * riff-chunks
 * Read and write the chunks of RIFF and RIFX files.
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

/** @private */
const byteData = require("byte-data");
/** @private */
const uInt32_ = {"bits": 32};
/** @private */
const fourCC_ = {"bits": 32, "char": true};

/**
 * Write the bytes of a RIFF/RIFX file.
 * @param {!Object} chunks A structure like the return of riffChunks.read().
 * @param {boolean} list An optional param indicating if the chunk is LIST.
 *      "LIST" chunks should not be rendered as Uint8Array.
 * @return {!Array<number>|!Uint8Array} The bytes as Uint8Array when chunkId is
 *      "RIFF"/"RIFX" or as Array<number> when chunkId is "LIST".
 */
function write(chunks, list=false) {
    uInt32_["be"] = chunks["chunkId"] == "RIFX";
    let bytes = byteData.pack(chunks["chunkId"], fourCC_).concat(
        byteData.pack(chunks["chunkSize"], uInt32_),
        byteData.pack(chunks["format"], fourCC_),
        writeSubChunks_(chunks["subChunks"]));
    if (!list) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Get the chunks of a RIFF/RIFX file.
 * @param {!Uint8Array|!Array<number>} buffer The file bytes.
 * @return {!Object} The chunk.
 */
function read(buffer) {
    buffer = [].slice.call(buffer);
    let chunkId = getChunkId_(buffer, 0);
    uInt32_["be"] = chunkId == "RIFX";
    return {
        "chunkId": chunkId,
        "chunkSize": getChunkSize_(buffer, 0),
        "format": byteData.unpack(buffer.slice(8, 12), fourCC_),
        "subChunks": getSubChunks_(buffer)
    };
}

/**
 * Write the sub chunks of a RIFF file.
 * @param {!Array<!Object>} chunks The chunks.
 * @return {!Array<number>} The chunk bytes.
 * @private
 */
function writeSubChunks_(chunks) {
    let subChunks = [];
    let i = 0;
    while (i < chunks.length) {
        if (chunks[i]["chunkId"] == "LIST") {
            subChunks = subChunks.concat(write(chunks[i], true));
        } else {
            subChunks = subChunks.concat(
                byteData.pack(chunks[i]["chunkId"], fourCC_),
                byteData.pack(chunks[i]["chunkSize"], uInt32_),
                chunks[i]["chunkData"]);
        }
        i++;
    }
    return subChunks;
}

/**
 * Get the sub chunks of a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @return {!Array<Object>} The subchunks of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunks_(buffer) {
    let chunks = [];
    let i = fixIndex_(buffer, 12);
    while(i <= buffer.length - 8) {
        chunks.push(getSubChunk_(buffer, i));
        i += 8 + chunks[chunks.length - 1]["chunkSize"];
    }
    return chunks;
}

/**
 * Get a sub chunk from a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {!Object} A subchunk of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunk_(buffer, index) {
    index = fixIndex_(buffer, index);
    let chunk = {
        "chunkId": getChunkId_(buffer, index),
        "chunkSize": getChunkSize_(buffer, index),
    };
    if (chunk["chunkId"] == "LIST") {
        chunk["format"] = byteData.unpack(
            buffer.slice(index + 8, index + 12), fourCC_);
        chunk["subChunks"] = getSubChunks_(buffer.slice(index));
    } else {
        chunk["chunkData"] = buffer.slice(
            index + 8, index + 8 + chunk["chunkSize"]);
    }
    return chunk;
}

/**
 * Fix the index for reading the chunkId for files
 * with broken size descriptions.
 * @param {!Uint8Array|!Array<number>} buffer The buffer.
 * @param {number} i The start index of the chunk.
 * @return {number} The new index.
 * @private
 */
function fixIndex_(buffer, i) {
    while (buffer[i] == 0 || buffer[i+1] == 0 ||
            buffer[i+2] == 0 || buffer[i+3] == 0) {
        i++;
    }
    return i;
}

/**
 * Return the fourCC_ of a chunk.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {string} The id of the chunk.
 * @private
 */
function getChunkId_(buffer, index) {
    return byteData.unpack(buffer.slice(index, index + 4), fourCC_);
}

/**
 * Return the size of a chunk.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {number} The size of the chunk without the id and size fields.
 * @private
 */
function getChunkSize_(buffer, index) {
    return byteData.unpack(buffer.slice(index + 4, index + 8), uInt32_);
}

module.exports.read = read;
module.exports.write = write;
