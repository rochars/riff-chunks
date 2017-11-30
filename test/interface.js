/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");

describe("interface", function() {

    const riffChunks = require("../index.js");
    
    it("Should have the riffChunks function available", function() {
        assert.ok(riffChunks([]));
    });
});
