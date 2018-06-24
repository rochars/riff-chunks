(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["riffChunks"] = factory();
	else
		root["riffChunks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "riffIndex", function() { return riffIndex; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_byte_data__ = __webpack_require__(1);
/*
 * riff-chunks: Read and write the chunks of RIFF and RIFX files.
 * https://github.com/rochars/riff-chunks
 *
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

/**
 * @fileoverview The riff-chunks public API and private methods.
 */

/** @module riffChunks */



/** @private */
const uInt32_ = {'bits': 32};
/** @private */
const fourCC_ = {'bits': 32, 'char': true};
/** @type {number} */
let head_ = 0;

/**
 * Return the chunks of a RIFF/RIFX file.
 * @param {!Uint8Array|!Array<number>} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
function riffIndex(buffer) {
    head_ = 0;
    let chunkId = getChunkId_(buffer, 0);
    uInt32_['be'] = chunkId == 'RIFX';
    let format = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["c" /* unpackFrom */])(buffer, fourCC_, 8);
    head_ += 4;
    return {
        'chunkId': chunkId,
        'chunkSize': getChunkSize_(buffer, 0),
        'format': format,
        'subChunks': getSubChunksIndex_(buffer)
    };
}

/**
 * Return the sub chunks of a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @return {!Array<Object>} The subchunks of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunksIndex_(buffer) {
    let chunks = [];
    let i = head_;
    while(i <= buffer.length - 8) {
        chunks.push(getSubChunkIndex_(buffer, i));
        i += 8 + chunks[chunks.length - 1]['chunkSize'];
        i = i % 2 ? i + 1 : i;
    }
    return chunks;
}

/**
 * Return a sub chunk from a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {!Object} A subchunk of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunkIndex_(buffer, index) {
    let chunk = {
        'chunkId': getChunkId_(buffer, index),
        'chunkSize': getChunkSize_(buffer, index),
    };
    if (chunk['chunkId'] == 'LIST') {
        chunk['format'] = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["c" /* unpackFrom */])(buffer, fourCC_, index + 8);
        head_ += 4;
        chunk['subChunks'] = getSubChunksIndex_(buffer);
    } else {
        let realChunkSize = chunk['chunkSize'] % 2 ?
            chunk['chunkSize'] + 1 : chunk['chunkSize'];
        head_ = index + 8 + realChunkSize;
        chunk['chunkData'] = {
            'start': index + 8,
            'end': head_
        };
    }
    return chunk;
}

/**
 * Pack a RIFF/RIFX file.
 * @param {!Object} chunks A object like the return of riffChunks.read().
 * @param {boolean} list An optional param indicating if the chunk is LIST.
 *      'LIST' chunks should not be rendered as Uint8Array.
 * @return {!Array<number>|!Uint8Array} The bytes as Uint8Array when chunkId is
 *      'RIFF'/'RIFX' or as Array<number> when chunkId is 'LIST'.
 */
function write(chunks, list=false) {
    uInt32_['be'] = chunks['chunkId'] == 'RIFX';
    let bytes = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["a" /* pack */])(chunks['chunkId'], fourCC_).concat(
        Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["a" /* pack */])(chunks['chunkSize'], uInt32_),
        Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["a" /* pack */])(chunks['format'], fourCC_),
        writeSubChunks_(chunks['subChunks']));
    if (!list) {
        bytes = new Uint8Array(bytes);
    }
    return bytes;
}

/**
 * Return the chunks of a RIFF/RIFX file.
 * @param {!Uint8Array|!Array<number>} buffer The file bytes.
 * @return {!Object} The RIFF chunks.
 */
function read(buffer) {
    buffer = [].slice.call(buffer);
    let chunkId = getChunkId_(buffer, 0);
    uInt32_['be'] = chunkId == 'RIFX';
    let format = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["b" /* unpack */])(buffer.slice(8, 12), fourCC_);
    let chunkSize = getChunkSize_(buffer, 0);
    let subChunks = getSubChunks_(buffer);
    return {
        'chunkId': chunkId,
        'chunkSize': chunkSize,
        'format': format,
        'subChunks': subChunks
    };
}

/**
 * Pack the sub chunks of a RIFF file.
 * @param {!Array<!Object>} chunks The chunks.
 * @return {!Array<number>} The chunk bytes.
 * @private
 */
function writeSubChunks_(chunks) {
    let subChunks = [];
    let i = 0;
    while (i < chunks.length) {
        if (chunks[i]['chunkId'] == 'LIST') {
            subChunks = subChunks.concat(write(chunks[i], true));
        } else {
            subChunks = subChunks.concat(
                Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["a" /* pack */])(chunks[i]['chunkId'], fourCC_),
                Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["a" /* pack */])(chunks[i]['chunkSize'], uInt32_),
                chunks[i]['chunkData']);
        }
        i++;
    }
    return subChunks;
}

/**
 * Return the sub chunks of a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @return {!Array<Object>} The subchunks of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunks_(buffer) {
    let chunks = [];
    let i = 12;
    while(i <= buffer.length - 8) {
        chunks.push(getSubChunk_(buffer, i));
        i += 8 + chunks[chunks.length - 1]['chunkSize'];
        i = i % 2 ? i + 1 : i;
    }
    return chunks;
}

/**
 * Return a sub chunk from a RIFF file.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {!Object} A subchunk of a RIFF/RIFX or LIST chunk.
 * @private
 */
function getSubChunk_(buffer, index) {
    let chunk = {
        'chunkId': getChunkId_(buffer, index),
        'chunkSize': getChunkSize_(buffer, index),
    };
    if (chunk['chunkId'] == 'LIST') {
        chunk['format'] = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["b" /* unpack */])(
            buffer.slice(index + 8, index + 12), fourCC_);
        chunk['subChunks'] = getSubChunks_(buffer.slice(index));
    } else {
        let slc = chunk['chunkSize'] % 2 ? chunk['chunkSize'] + 1 : chunk['chunkSize'];
        chunk['chunkData'] = buffer.slice(
            index + 8, index + 8 + slc);
    }
    return chunk;
}

/**
 * Return the fourCC_ of a chunk.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {string} The id of the chunk.
 * @private
 */
function getChunkId_(buffer, index) {
    head_ += 4;
    return Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["c" /* unpackFrom */])(buffer, fourCC_, index);
}

/**
 * Return the size of a chunk.
 * @param {!Uint8Array|!Array<number>} buffer the RIFF file bytes.
 * @param {number} index The start index of the chunk.
 * @return {number} The size of the chunk without the id and size fields.
 * @private
 */
function getChunkSize_(buffer, index) {
    head_ += 4;
    return Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["c" /* unpackFrom */])(buffer, uInt32_, index + 4);
}




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = pack;
/* unused harmony export packArray */
/* unused harmony export packTo */
/* unused harmony export packArrayTo */
/* harmony export (immutable) */ __webpack_exports__["b"] = unpack;
/* unused harmony export unpackArray */
/* harmony export (immutable) */ __webpack_exports__["c"] = unpackFrom;
/* unused harmony export unpackArrayFrom */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__lib_types_js__ = __webpack_require__(2);
/* unused harmony reexport types */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lib_integer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_endianness__ = __webpack_require__(4);
/*
 * byte-data: Pack and unpack binary data.
 * https://github.com/rochars/byte-data
 *
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

/**
 * @fileoverview The byte-data API.
 */

/** @module byteData */

/**
 * byte-data standard types.
 * @type {!Object}
 */


/**
 * @constructor
 */


/**
 * @type {!Function}
 * @private
 */

/**
 * @type {!Int8Array}
 * @private
 */
const int8_ = new Int8Array(8);
/**
 * @type {!Uint32Array}
 * @private
 */
const ui32_ = new Uint32Array(int8_.buffer);
/**
 * @type {!Float32Array}
 * @private
 */
const f32_ = new Float32Array(int8_.buffer);
/**
 * @type {!Float64Array}
 * @private
 */
const f64_ = new Float64Array(int8_.buffer);
/**
 * @type {Function}
 * @private
 */
let reader_;
/**
 * @type {Function}
 * @private
 */
let writer_;
/**
 * @type {Object}
 * @private
 */
let gInt_ = {};

/**
 * Pack a number or a string as a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function pack(value, theType) {
    setUp_(theType);
    return toBytes_([value], theType);
}

/**
 * Pack an array of numbers or strings to a byte buffer.
 * @param {!Array<number|string>} values The values.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If any of the values are not valid.
 */
function packArray(values, theType) {
    setUp_(theType);
    return toBytes_(values, theType);
}

/**
 * Pack a number or a string as a byte buffer.
 * @param {number|string} value The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number} index The buffer index to write.
 * @return {number} The next index to start writing.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function packTo(value, theType, buffer, index) {
    setUp_(theType);
    let validate = validateNotNull_;
    if (theType['char']) {
        validate = validateString_;
    }
    return writeBytes_(value,
        theType,
        buffer,
        index,
        index + theType['offset'],
        validate,
        theType['be']);
}

/**
 * Pack a number or a string as a byte buffer.
 * @param {number|string} values The value.
 * @param {!Object} theType The type definition.
 * @param {!Uint8Array|!Array<number>} buffer The output buffer.
 * @param {number} index The buffer index to write.
 * @return {number} The next index to start writing.
 * @throws {Error} If the type definition is not valid.
 * @throws {Error} If the value is not valid.
 */
function packArrayTo(values, theType, buffer, index) {
    setUp_(theType);
    let validate = validateNotNull_;
    if (theType['char']) {
        validate = validateString_;
    }
    let be = theType['be'];
    let offset = theType['offset'];
    for (let i=0; i<values.length; i++) {
        index = writeBytes_(
            values[i],
            theType,
            buffer,
            index,
            index + offset,
            validate, be);
    }
    return index;
}

/**
 * Unpack a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {number|string}
 * @throws {Error} If the type definition is not valid
 */
function unpack(buffer, theType) {
    setUp_(theType);
    let values = fromBytes_(
        buffer.slice(0, theType['offset']), theType);
    return values[0];
}

/**
 * Unpack an array of numbers or strings from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>}
 * @throws {Error} If the type definition is not valid.
 */
function unpackArray(buffer, theType) {
    setUp_(theType);
    return fromBytes_(buffer, theType);
}

/**
 * Unpack a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} index The buffer index to read.
 * @return {number|string}
 * @throws {Error} If the type definition is not valid
 */
function unpackFrom(buffer, theType, index=0) {
    setUp_(theType);
    return readBytes_(buffer, theType, index);
}

/**
 * Unpack a number or a string from a byte buffer.
 * @param {!Array<number>|!Uint8Array} buffer The byte buffer.
 * @param {!Object} theType The type definition.
 * @param {number=} start The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the array length.
 * @return {!Array<number>}
 * @throws {Error} If the type definition is not valid
 */
function unpackArrayFrom(buffer, theType, start=0, end=null) {
    setUp_(theType);
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(buffer, theType['offset']);
    }
    let len = end || buffer.length;
    let values = [];
    for (let i=start; i<len; i+=theType['offset']) {
        values.push(reader_(buffer, i));
    }
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(buffer, theType['offset']);
    }
    return values;
}

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @return {number}
 * @private
 */
function readBytes_(buffer, theType, start) {
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(buffer, theType['offset'], start, start + theType['offset']);
    }
    let value = reader_(buffer, start);
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(buffer, theType['offset'], start, start + theType['offset']);
    }
    return value;
}

/**
 * Turn a byte buffer into what the bytes represent.
 * @param {!Array<number|string>|!Uint8Array} buffer An array of bytes.
 * @param {!Object} theType The type definition.
 * @return {!Array<number>}
 * @private
 */
function fromBytes_(buffer, theType) {
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(buffer, theType['offset']);
    }
    let len = buffer.length;
    let values = [];
    len = len - (theType['offset'] - 1);
    for (let i=0; i<len; i+=theType['offset']) {
        values.push(reader_(buffer, i));
    }
    return values;
}

/**
 * Turn numbers and strings to bytes.
 * @param {!Array<number|string>} values The data.
 * @param {!Object} theType The type definition.
 * @return {!Array<number|string>} the data as a byte buffer.
 * @private
 */
function toBytes_(values, theType) {
    let j = 0;
    let bytes = [];
    let len = values.length;
    let validate = validateNotNull_;
    if (theType['char']) {
        validate = validateString_;
    }
    for(let i=0; i < len; i++) {
        validate(values[i], theType);
        j = writer_(bytes, values[i], j);
    }
    if (theType['be']) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(bytes, theType['offset']);
    }
    return bytes;
}

/**
 * Turn numbers and strings to bytes.
 * @param {number|string} value The value to be packed.
 * @param {!Object} theType The type definition.
 * @param {!Object} buffer The buffer to write the bytes to.
 * @param {number} index The index to start writing.
 * @param {number} len The end index.
 * @param {!Function} validate The function used to validate input.
 * @param {boolean} be True if big-endian.
 * @return {number} the new index to be written.
 * @private
 */
function writeBytes_(value, theType, buffer, index, len, validate, be) {
    for(let i=index; i<len; i++) {
        validate(value, theType);
        i = writer_(buffer, value, i);
        index = i;
    }
    if (be) {
        Object(__WEBPACK_IMPORTED_MODULE_2_endianness__["a" /* endianness */])(
            buffer, theType['offset'], index - theType['offset'], index);
    }
    return index;
}

/**
 * Read int values from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function readInt_(bytes, i) {
    return gInt_.read(bytes, i);
}

/**
 * Read 1 16-bit float from bytes.
 * Thanks https://stackoverflow.com/a/8796597
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read16F_(bytes, i) {
    let int = gInt_.read(bytes, i);
    let exponent = (int & 0x7C00) >> 10;
    let fraction = int & 0x03FF;
    let floatValue;
    if (exponent) {
        floatValue =  Math.pow(2, exponent - 15) * (1 + fraction / 0x400);
    } else {
        floatValue = 6.103515625e-5 * (fraction / 0x400);
    }
    return floatValue * (int >> 15 ? -1 : 1);
}

/**
 * Read 1 32-bit float from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read32F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    return f32_[0];
}

/**
 * Read 1 64-bit float from bytes.
 * Thanks https://gist.github.com/kg/2192799
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {number}
 * @private
 */
function read64F_(bytes, i) {
    ui32_[0] = gInt_.read(bytes, i);
    ui32_[1] = gInt_.read(bytes, i + 4);
    return f64_[0];
}

/**
 * Read 1 char from bytes.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} i The index to read.
 * @return {string}
 * @private
 */
function readChar_(bytes, i) {
    let chrs = '';
    for(let j=0; j < gInt_.offset; j++) {
        chrs += String.fromCharCode(bytes[i+j]);
    }
    return chrs;
}

/**
 * Write a integer value to a byte buffer.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {!number} The next index to write on the byte buffer.
 * @private
 */
function writeInt_(bytes, number, j) {
    return gInt_.write(bytes, number, j);
}

/**
 * Write one 16-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write16F_(bytes, number, j) {
    f32_[0] = number;
    let x = ui32_[0];
    let bits = (x >> 16) & 0x8000;
    let m = (x >> 12) & 0x07ff;
    let e = (x >> 23) & 0xff;
    if (e >= 103) {
        bits |= ((e - 112) << 10) | (m >> 1);
        bits += m & 1;
    }
    bytes[j++] = bits & 0xFF;
    bytes[j++] = bits >>> 8 & 0xFF;
    return j;
}

/**
 * Write one 32-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write32F_(bytes, number, j) {
    f32_[0] = number;
    return gInt_.write(bytes, ui32_[0], j);
}

/**
 * Write one 64-bit float as a binary value.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {number} number The number to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function write64F_(bytes, number, j) {
    f64_[0] = number;
    j = gInt_.write(bytes, ui32_[0], j);
    return gInt_.write(bytes, ui32_[1], j);
}

/**
 * Write one char as a byte.
 * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
 * @param {string} str The string to write as bytes.
 * @param {number} j The index being written in the byte buffer.
 * @return {number} The next index to write on the byte buffer.
 * @private
 */
function writeChar_(bytes, str, j) {
    for (let i=0; i<str.length; i++) {
        bytes[j++] = str.charCodeAt(i);
    }
    return j;
}

/**
 * Set the function to unpack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setReader(theType) {
    if (theType['float']) {
        if (theType['bits'] == 16) {
            reader_ = read16F_;
        } else if(theType['bits'] == 32) {
            reader_ = read32F_;
        } else if(theType['bits'] == 64) {
            reader_ = read64F_;
        }
    } else if (theType['char']) {
        reader_ = readChar_;
    } else {
        reader_ = readInt_;
    }
}

/**
 * Set the function to pack the data.
 * @param {!Object} theType The type definition.
 * @private
 */
function setWriter(theType) {
    if (theType['float']) {
        if (theType['bits'] == 16) {
            writer_ = write16F_;
        } else if(theType['bits'] == 32) {
            writer_ = write32F_;
        } else if(theType['bits'] == 64) {
            writer_ = write64F_;
        }
    } else if (theType['char']) {
        writer_ = writeChar_;
    } else {
        writer_ = writeInt_;
    }   
}

/**
 * Validate the type and set up the packing/unpacking functions.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function setUp_(theType) {
    validateType_(theType);
    theType['offset'] = theType['bits'] < 8 ? 1 : Math.ceil(theType['bits'] / 8);
    setReader(theType);
    setWriter(theType);
    if (!theType['char']) {
        gInt_ = new __WEBPACK_IMPORTED_MODULE_1__lib_integer__["a" /* Integer */](
            theType['bits'] == 64 ? 32 : theType['bits'],
            theType['float'] ? false : theType['signed']);
    } else {
        // Workaround; should not use Integer when type['char']
        gInt_.offset = theType['bits'] < 8 ? 1 : Math.ceil(theType['bits'] / 8);
    }
}

/**
 * Validate the type definition.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateType_(theType) {
    if (!theType) {
        throw new Error('Undefined type.');
    }
    if (theType['float']) {
        validateFloatType_(theType);
    } else {
        if (theType['char']) {
            validateCharType_(theType);
        } else {
            validateIntType_(theType);
        }
    }
}

/**
 * Validate the type definition of floating point numbers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateFloatType_(theType) {
    if ([16,32,64].indexOf(theType['bits']) == -1) {
        throw new Error('Not a supported float type.');
    }
}

/**
 * Validate the type definition of char and strings.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateCharType_(theType) {
    if (theType['bits'] < 8 || theType['bits'] % 2) {
        throw new Error('Wrong offset for type char.');
    }
}

/**
 * Validate the type definition of integers.
 * @param {!Object} theType The type definition.
 * @throws {Error} If the type definition is not valid.
 * @private
 */
function validateIntType_(theType) {
    if (theType['bits'] < 1 || theType['bits'] > 53) {
        throw new Error('Not a supported type.');
    }
}

/**
 * Validate strings with bad length.
 * @param {string|number} value The string to validate.
 * @param {!Object} theType The type definition.
 * @private
 */
function validateString_(value, theType) {
    validateNotNull_(value);
    if (value.length > theType['offset']) {
        throw new Error('String is bigger than its type definition.');
    } else if (value.length < theType['offset']) {
        throw new Error('String is smaller than its type definition.');
    }
}
/**
 * Validate that the value is not null.
 * @param {string|number} value The value.
 * @private
 */
function validateNotNull_(value) {
    if (value === null || value === undefined) {
        throw new Error('Cannot pack null or undefined values.');
    }
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * byte-data: Pack and unpack binary data.
 * https://github.com/rochars/byte-data
 *
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

/**
 * @fileoverview Standard type definitions.
 */

/** @module byteData/types */

/**
 * byte-data standard types.
 * @type {!Object}
 */
const types = {
	/**
	 * A char.
	 * @type {!Object}
	 * @export
	 */
	chr: {'bits': 8, 'char': true},
	/**
	 * A 4-char string
	 * @type {!Object}
	 * @export
	 */
	fourCC: {'bits': 32, 'char': true},
	/**
	 * Booleans
	 * @type {!Object}
	 * @export
	 */
	bool: {'bits': 1},
	/**
	 * Signed 2-bit integers
	 * @type {!Object}
	 * @export
	 */
	int2: {'bits': 2, 'signed': true},
	/**
	 * Unsigned 2-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt2: {'bits': 2},
	/**
	 * Signed 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	int4: {'bits': 4, 'signed': true},
	/**
	 * Unsigned 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt4: {'bits': 4},
	/**
	 * Signed 8-bit integers
	 * @type {!Object}
	 * @export
	 */
	int8: {'bits': 8, 'signed': true},
	/**
	 * Unsigned 4-bit integers
	 * @type {!Object}
	 * @export
	 */
	uInt8: {'bits': 8},
	// LE
	/**
	 * Signed 16-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int16 : {'bits': 16, 'signed': true},
	/**
	 * Unsigned 16-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt16: {'bits': 16},
	/**
	 * Half-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float16: {'bits': 16, 'float': true},
	/**
	 * Signed 24-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int24: {'bits': 24, 'signed': true},
	/**
	 * Unsigned 24-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt24: {'bits': 24},
	/**
	 * Signed 32-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int32: {'bits': 32, 'signed': true},
	/**
	 * Unsigned 32-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt32: {'bits': 32},
	/**
	 * Single-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float32: {'bits': 32, 'float': true},
	/**
	 * Signed 40-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int40: {'bits': 40, 'signed': true},
	/**
	 * Unsigned 40-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt40: {'bits': 40},
	/**
	 * Signed 48-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	int48: {'bits': 48, 'signed': true},
	/**
	 * Unsigned 48-bit integers little-endian
	 * @type {!Object}
	 * @export
	 */
	uInt48: {'bits': 48},
	/**
	 * Double-precision floating-point numbers little-endian
	 * @type {!Object}
	 * @export
	 */
	float64: {'bits': 64, 'float': true},
	// BE
	/**
	 * Signed 16-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int16BE : {'bits': 16, 'signed': true, 'be': true},
	/**
	 * Unsigned 16-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt16BE: {'bits': 16, 'be': true},
	/**
	 * Half-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float16BE: {'bits': 16, 'float': true, 'be': true},
	/**
	 * Signed 24-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int24BE: {'bits': 24, 'signed': true, 'be': true},
	/**
	 * Unsigned 24-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt24BE: {'bits': 24, 'be': true},
	/**
	 * Signed 32-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int32BE: {'bits': 32, 'signed': true, 'be': true},
	/**
	 * Unsigned 32-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt32BE: {'bits': 32, 'be': true},
	/**
	 * Single-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float32BE: {'bits': 32, 'float': true, 'be': true},
	/**
	 * Signed 40-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int40BE: {'bits': 40, 'signed': true, 'be': true},
	/**
	 * Unsigned 40-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt40BE: {'bits': 40, 'be': true},
	/**
	 * Signed 48-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	int48BE: {'bits': 48, 'signed': true, 'be': true},
	/**
	 * Unsigned 48-bit integers big-endian
	 * @type {!Object}
	 * @export
	 */
	uInt48BE: {'bits': 48, 'be': true},
	/**
	 * Double-precision floating-point numbers big-endian
	 * @type {!Object}
	 * @export
	 */
	float64BE: {'bits': 64, 'float': true, 'be': true},
};
/* unused harmony export types */



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/*
 * byte-data: Pack and unpack binary data.
 * https://github.com/rochars/byte-data
 *
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

/**
 * @fileoverview Pack and unpack two's complement ints and unsigned ints.
 */

/**
 * A class to pack and unpack two's complement ints and unsigned ints.
 * 
 */
class Integer {

    /**
     * @param {number} bits Number of bits used by the data.
     * @param {boolean} signed True for signed types.
     * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
     */
    constructor(bits, signed) {
        /**
         * The max number of bits used by the data.
         * @type {number}
         */
        this.bits = bits;
        /**
         * If this type it is signed or not.
         * @type {boolean}
         */
        this.signed = signed;
        /**
         * The number of bytes used by the data.
         * @type {number}
         */
        this.offset = 0;
        /**
         * Min value for numbers of this type.
         * @type {number}
         */
        this.min = -Infinity;
        /**
         * Max value for numbers of this type.
         * @type {number}
         */
        this.max = Infinity;
        /**
         * The practical number of bits used by the data.
         * @type {number}
         * @private
         */
        this.realBits_ = this.bits;
        /**
         * The mask to be used in the last byte.
         * @type {number}
         * @private
         */
        this.lastByteMask_ = 255;
        this.build_();
    }

    /**
     * Read one integer number from a byte buffer.
     * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
     * @param {number=} i The index to read.
     * @return {number}
     */
    read(bytes, i=0) {
        let num = 0;
        let x = this.offset - 1;
        while (x > 0) {
            num = (bytes[x + i] << x * 8) | num;
            x--;
        }
        num = (bytes[i] | num) >>> 0;
        return this.overflow_(this.sign_(num));
    }

    /**
     * Write one integer number to a byte buffer.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number=} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     */
    write(bytes, number, j=0) {
        number = this.overflow_(number);
        bytes[j++] = number & 255;
        for (let i = 2; i <= this.offset; i++) {
            bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & 255;
        }
        return j;
    }

    /**
     * Write one integer number to a byte buffer.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number=} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeEsoteric_(bytes, number, j=0) {
        number = this.overflow_(number);
        j = this.writeFirstByte_(bytes, number, j);
        for (let i = 2; i < this.offset; i++) {
            bytes[j++] = Math.floor(number / Math.pow(2, ((i - 1) * 8))) & 255;
        }
        if (this.bits > 8) {
            bytes[j++] = Math.floor(
                    number / Math.pow(2, ((this.offset - 1) * 8))) &
                this.lastByteMask_;
        }
        return j;
    }

    /**
     * Read a integer number from a byte buffer by turning int bytes
     * to a string of bits. Used for data with more than 32 bits.
     * @param {!Array<number>|!Uint8Array} bytes An array of bytes.
     * @param {number=} i The index to read.
     * @return {number}
     * @private
     */
    readBits_(bytes, i=0) {
        let binary = '';
        let j = 0;
        while(j < this.offset) {
            let bits = bytes[i + j].toString(2);
            binary = new Array(9 - bits.length).join('0') + bits + binary;
            j++;
        }
        return this.overflow_(this.sign_(parseInt(binary, 2)));
    }

    /**
     * Build the type.
     * @throws {Error} if the number of bits is smaller than 1 or greater than 64.
     * @private
     */
    build_() {
        this.setRealBits_();
        this.setLastByteMask_();
        this.setMinMax_();
        this.offset = this.bits < 8 ? 1 : Math.ceil(this.realBits_ / 8);
        if ((this.realBits_ != this.bits) || this.bits < 8 || this.bits > 32) {
            this.write = this.writeEsoteric_;
            this.read = this.readBits_;
        }
    }

    /**
     * Sign a number.
     * @param {number} num The number.
     * @return {number}
     * @private
     */
    sign_(num) {
        if (num > this.max) {
            num -= (this.max * 2) + 2;
        }
        return num;
    }

    /**
     * Limit the value according to the bit depth in case of
     * overflow or underflow.
     * @param {number} value The data.
     * @return {number}
     * @private
     */
    overflow_(value) {
        if (value > this.max) {
            throw new Error('Overflow.');
        } else if (value < this.min) {
            throw new Error('Underflow.');
        }
        return value;
    }

    /**
     * Set the minimum and maximum values for the type.
     * @private
     */
    setMinMax_() {
        let max = Math.pow(2, this.bits);
        if (this.signed) {
            this.max = max / 2 -1;
            this.min = -max / 2;
        } else {
            this.max = max - 1;
            this.min = 0;
        }
    }

    /**
     * Set the practical bit number for data with bit count different
     * from the standard types (8, 16, 32, 40, 48, 64) and more than 8 bits.
     * @private
     */
    setRealBits_() {
        if (this.bits > 8) {
            this.realBits_ = ((this.bits - 1) | 7) + 1;
        }
    }

    /**
     * Set the mask that should be used when writing the last byte.
     * @private
     */
    setLastByteMask_() {
        let r = 8 - (this.realBits_ - this.bits);
        this.lastByteMask_ = Math.pow(2, r > 0 ? r : 8) -1;
    }

    /**
     * Write the first byte of a integer number.
     * @param {!Array<number>} bytes An array of bytes.
     * @param {number} number The number.
     * @param {number} j The index being written in the byte buffer.
     * @return {number} The next index to write on the byte buffer.
     * @private
     */
    writeFirstByte_(bytes, number, j) {
        if (this.bits < 8) {
            bytes[j++] = number < 0 ? number + Math.pow(2, this.bits) : number;
        } else {
            bytes[j++] = number & 255;
        }
        return j;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Integer;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = endianness;
/*
 * endianness: Swap endianness in byte arrays.
 * https://github.com/rochars/endianness
 *
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

/**
 * @fileoverview A function to swap endianness in byte buffers.
 */

/**
 * @module endianness
 */

/**
 * Swap the byte ordering in a buffer. The buffer is modified in place.
 * @param {!Array<number|string>|!Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number=} start The start index. Assumes 0.
 * @param {?number=} end The end index. Assumes the buffer length.
 * @throws {Error} If the buffer length is not valid.
 */
function endianness(bytes, offset, start=0, end=null) {
    let len = end || bytes.length;
    let limit = parseInt(offset / 2, 10);
    if (len % offset) {
        throw new Error("Bad buffer length.");
    }
    let i = start;
    while (i < len) {
        swap(bytes, offset, i, limit);
        i += offset;
    }
}

/**
 * Swap the byte order of a value in a buffer. The buffer is modified in place.
 * @param {!Array<number|string>|!Uint8Array} bytes The bytes.
 * @param {number} offset The byte offset.
 * @param {number} index The start index.
 * @private
 */
function swap(bytes, offset, index, limit) {
    let x = 0;
    let y = offset - 1;
    while(x < limit) {
        let theByte = bytes[index + x];
        bytes[index + x] = bytes[index + y];
        bytes[index + y] = theByte;
        x++;
        y--;
    }
}


/***/ })
/******/ ]);
});