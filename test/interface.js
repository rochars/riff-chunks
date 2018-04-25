/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");

describe("interface", function() {

    const riffChunks = require("../test/loader.js");

    it("Should have the read() function available", function() {
        assert.ok(riffChunks.read([]));
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
