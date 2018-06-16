/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

let riffChunks;

if (process.argv[3] == '--dist') {
    require('browser-env')();let assert = require('assert');
    require('../dist/riff-chunks.min.js');
    riffChunks = window.riffChunks;
} else {
	riffChunks = require('../index.js');
}

module.exports = riffChunks;
