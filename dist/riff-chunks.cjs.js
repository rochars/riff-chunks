(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_byte_data___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_byte_data__);
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
    let format = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpackFrom"])(buffer, fourCC_, 8);
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
        chunk['format'] = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpackFrom"])(buffer, fourCC_, index + 8);
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
    let bytes = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["pack"])(chunks['chunkId'], fourCC_).concat(
        Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["pack"])(chunks['chunkSize'], uInt32_),
        Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["pack"])(chunks['format'], fourCC_),
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
    let format = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpack"])(buffer.slice(8, 12), fourCC_);
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
                Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["pack"])(chunks[i]['chunkId'], fourCC_),
                Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["pack"])(chunks[i]['chunkSize'], uInt32_),
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
        chunk['format'] = Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpack"])(
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
    return Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpackFrom"])(buffer, fourCC_, index);
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
    return Object(__WEBPACK_IMPORTED_MODULE_0_byte_data__["unpackFrom"])(buffer, uInt32_, index + 4);
}




/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("byte-data");

/***/ })
/******/ ])));