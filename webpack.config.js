/*
 * https://github.com/rochars/riff-chunks
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview webpack configuration file.
 * Three dist files are created:
 * - riff-chunks.cjs.js, CommonJS dist for Node. No dependencies included.
 * - riff-chunks.umd.js, UMD with dependencies included.
 * - riff-chunks.min.js, Compiled for browsers. All dependencies included.
 */

const ClosureCompiler = require('google-closure-compiler-js').webpack;

module.exports = [
  // CommonJS dist, no dependencies in the bundle.
  // Will be the one in the "main" field of package.json.
  {
    target: 'node',
    entry: './main.js',
    output: {
      filename: './dist/riff-chunks.cjs.js',
      libraryTarget: "commonjs"
    },
    externals: {
      'byte-data': 'byte-data',
    },
  },
  // UMD with dependencies in the bundle.
  // Will be the one in the "browser" field of package.json.
  {
    entry: './main.js',
    resolve: {
      mainFields: ['module', 'main']
    },
    output: {
      filename: './dist/riff-chunks.umd.js',
      library: "riffChunks",
      libraryTarget: "umd"
    }
  },
  // Browser dist with dependencies, compiled.
  {
    entry: './main.js',
    resolve: {
      mainFields: ['module', 'main']
    },
    output: {
      filename: './dist/riff-chunks.min.js',
      library: "riffChunks",
      libraryTarget: "window"
    },
    plugins: [
      new ClosureCompiler({
        options: {
          languageIn: 'ECMASCRIPT6',
          languageOut: 'ECMASCRIPT5',
          compilationLevel: 'ADVANCED',
          warningLevel: 'VERBOSE',
          exportLocalPropertyDefinitions: true,
          generateExports: true
        },
      })
    ]
  },
];
