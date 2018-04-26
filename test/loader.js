/**
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

let riffChunks = require('../index.js');

if (process.argv[3] == '--dist') {
    require('browser-env')();let assert = require('assert');
    require('../dist/riff-chunks-min.js');
    riffChunks = window.riffChunks;
}

module.exports = riffChunks;
