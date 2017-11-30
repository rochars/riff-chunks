/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");


describe("riffChunks vs RIFF WAVE", function() {

    const riffChunks = require("../index.js");
    const fs = require("fs");
    
    let chunks = riffChunks(
        fs.readFileSync('./test/16bit-16kHz-2markers-mono.wav'));
    
    it("chunkId should be RIFF", function() {
        assert.equal(chunks.chunkId, "RIFF");
    });
    it("format should be WAVE", function() {
        assert.equal(chunks.format, "WAVE");
    });
    it("subChunks length should be 5 ('fmt ', 'junk', 'cue ', 'data', 'LIST')",
            function() {
        assert.equal(chunks.subChunks.length, 5);
    });
    it("chunks.subChunks[0].subChunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].subChunkId, "fmt ");
    });
    it("chunks.subChunks[1].subChunkId should be 'junk'", function() {
        assert.equal(chunks.subChunks[1].subChunkId, "junk");
    });
    it("chunks.subChunks[2].subChunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[2].subChunkId, "data");
    });
    it("chunks.subChunks[3].subChunkId should be 'cue '", function() {
        assert.equal(chunks.subChunks[3].subChunkId, "cue ");
    });
    it("chunks.subChunks[4].subChunkId should be 'LIST'", function() {
        assert.equal(chunks.subChunks[4].subChunkId, "LIST");
    });
});
