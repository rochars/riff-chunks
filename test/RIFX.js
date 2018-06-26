/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");


describe("riffChunks vs RIFX WAVE: Read", function() {

    const riffChunks = require("../test/loader.js");
    const fs = require("fs");
    
    let chunks = riffChunks(fs.readFileSync('./test/files/RIFX-16bit-mono.wav'));
    
    it("chunkId should be RIFX", function() {
        assert.equal(chunks.chunkId, "RIFX");
    });
    it("format should be WAVE", function() {
        assert.equal(chunks.format, "WAVE");
    });
    it("subChunks length should be 2 ('fmt ' and 'data')", function() {
        assert.equal(chunks.subChunks.length, 2);
    });
    it("chunks.subChunks[0].chunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].chunkId, "fmt ");
    });
    it("chunks.subChunks[1].chunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[1].chunkId, "data");
    });
});
