/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

let riffChunks;

// Browser bundle
if (process.argv[3] == '--min') {
    require('browser-env')();
    require('../dist/riff-chunks.min.js');
    riffChunks = window.riffChunks;

// UMD bundle
} else if (process.argv[3] == '--umd') {
	riffChunks = require('../dist/riff-chunks.umd.js');

// CommonJS dist
} else if (process.argv[3] == '--cjs') {
	riffChunks = require('../dist/riff-chunks.cjs.js');

// ESM
} else {
	riffChunks = require('../main.js');

}

module.exports = riffChunks;
