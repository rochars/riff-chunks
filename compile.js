/*
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

const riffChunks = require("./index.js");

window['riffChunks'] = window['riffChunks'] ? window['riffChunks'] : {};
window['riffChunks']['read'] = riffChunks.read;
window['riffChunks']['write'] = riffChunks.write;