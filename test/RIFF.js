/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");


describe("riffChunks vs RIFF WAVE: Read file", function() {

    const riffChunks = require("../test/loader.js");
    //const path = require("../test/loader.js").path;
    const fs = require("fs");
    
    let chunks = riffChunks.read(
        fs.readFileSync('./test/files/16bit-16kHz-2markers-mono.wav'));
    
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
    it("chunks.subChunks[0].chunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].chunkId, "fmt ");
    });
    it("chunks.subChunks[1].chunkId should be 'junk'", function() {
        assert.equal(chunks.subChunks[1].chunkId, "junk");
    });
    it("chunks.subChunks[2].chunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[2].chunkId, "data");
    });
    it("chunks.subChunks[3].chunkId should be 'cue '", function() {
        assert.equal(chunks.subChunks[3].chunkId, "cue ");
    });
    it("chunks.subChunks[4].chunkId should be 'LIST'", function() {
        assert.equal(chunks.subChunks[4].chunkId, "LIST");
    });
});

describe("riffChunks vs RIFF WAVE: Read file, write to object, read object", function() {

    const riffChunks = require("../index.js");
    const fs = require("fs");
    
    let chunks = riffChunks.read(
        fs.readFileSync('./test/files/16bit-16kHz-2markers-mono.wav'));
    chunks = riffChunks.read(riffChunks.write(chunks));
    
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
    it("chunks.subChunks[0].chunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].chunkId, "fmt ");
    });
    it("chunks.subChunks[1].chunkId should be 'junk'", function() {
        assert.equal(chunks.subChunks[1].chunkId, "junk");
    });
    it("chunks.subChunks[2].chunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[2].chunkId, "data");
    });
    it("chunks.subChunks[3].chunkId should be 'cue '", function() {
        assert.equal(chunks.subChunks[3].chunkId, "cue ");
    });
    it("chunks.subChunks[4].chunkId should be 'LIST'", function() {
        assert.equal(chunks.subChunks[4].chunkId, "LIST");
    });
});

describe("riffChunks vs RIFF WAVE: Read file, write file, read again", function() {

    const riffChunks = require("../index.js");
    const fs = require("fs");
    
    let chunks = riffChunks.read(
        fs.readFileSync('./test/files/16bit-16kHz-2markers-mono.wav'));
    fs.writeFileSync('./test/files/output.wav', riffChunks.write(chunks));
    chunks = riffChunks.read(fs.readFileSync('./test/files/output.wav'));
    
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
    it("chunks.subChunks[0].chunkId should be 'fmt '", function() {
        assert.equal(chunks.subChunks[0].chunkId, "fmt ");
    });
    it("chunks.subChunks[1].chunkId should be 'junk'", function() {
        assert.equal(chunks.subChunks[1].chunkId, "junk");
    });
    it("chunks.subChunks[2].chunkId should be 'data'", function() {
        assert.equal(chunks.subChunks[2].chunkId, "data");
    });
    it("chunks.subChunks[3].chunkId should be 'cue '", function() {
        assert.equal(chunks.subChunks[3].chunkId, "cue ");
    });
    it("chunks.subChunks[4].chunkId should be 'LIST'", function() {
        assert.equal(chunks.subChunks[4].chunkId, "LIST");
    });
});