/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

const assert = require("assert");
const fs = require("fs");

describe("interface", function() {

    const riffChunks = require("../test/loader.js");

    it("Should have the read() function available", function() {
        assert.ok(riffChunks.read([]));
    });
    it("Should have the riffIndex() function available", function() {
        assert.ok(riffChunks.riffIndex(
            fs.readFileSync('./test/files/M1F1-int12WE-AFsp-NEW-TAGS.wav')));
    });
    it("Should have the write() function available", function() {
        assert.ok(riffChunks.write({
                "chunkId": "RIFF",
                "chunkSize": 0,
                "format": "WAVE",
                "subChunks": []
            })
        );
    });
});
