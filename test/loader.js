/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

let riffChunks;

// Browser
if (process.argv[3] == '--min') {
	console.log('browser');
    require('browser-env')();
    require('../dist/riff-chunks.min.js');
    riffChunks = window.riffChunks.riffChunks;

// UMD
} else if (process.argv[3] == '--umd') {
	console.log('umd');
	riffChunks = require('../dist/riff-chunks.umd.js').riffChunks;

// CommonJS
} else if (process.argv[3] == '--cjs') {
	console.log('cjs');
	riffChunks = require('../dist/riff-chunks.cjs.js').riffChunks;

// ESM
} else if (process.argv[3] == '--esm') {
	console.log('esm');
	riffChunks = require('../dist/riff-chunks.js').riffChunks;

// Source
} else {
	console.log('Source tests');
	riffChunks = require('../main.js').riffChunks;
}

module.exports = riffChunks;
