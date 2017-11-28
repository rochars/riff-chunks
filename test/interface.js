/*
 * riff-chunks
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * 
 */

var assert = require("assert");

describe("interface", function() {

    let bitdepth = require("../index.js");
    
    it("Should have the getChunks function available", function() {
        assert.ok(bitdepth.getChunks([]));
    });
});
