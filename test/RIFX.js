/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");


describe("riffChunks vs RIFX WAVE", function() {

    const riffChunks = require("../index.js");
    const fs = require("fs");
    
    let chunks = riffChunks(fs.readFileSync('./test/RIFX-16bit-mono.wav'));
    
    it("chunkId should be RIFX", function() {
        assert.equal(chunks.chunkId, "RIFX");
    });
    it("format should be WAVE", function() {
        assert.equal(chunks.format, "WAVE");
    });
    it("subChunks length should be 2 ('fmt ' and 'data')", function() {
        assert.equal(chunks.subChunks.length, 2);
    });
    it("chunks.subChunks[0].subChunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].subChunkId, "fmt ");
    });
    it("chunks.subChunks[1].subChunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[1].subChunkId, "data");
    });
});
