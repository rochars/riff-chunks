/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import closure from 'rollup-plugin-closure-compiler-js';

// License notes for bundles that include dependencies
const license = '/*!\n'+
  ' * riff-chunks Copyright (c) 2017-2018 Rafael da Silva Rocha.\n'+
  ' */\n';

export default [
  // cjs
  {
    input: 'main.js',
    external: ['byte-data'],
    output: [
      {
        file: 'dist/riff-chunks.cjs.js',
        name: 'riff-chunks',
        format: 'cjs'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // umd, es
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/riff-chunks.umd.js',
        name: 'riff-chunks',
        format: 'umd'
      },
      {
        file: 'dist/riff-chunks.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // browser
  {
    input: 'main.js',
    output: [
      {
        name: 'riffChunks',
        format: 'iife',
        file: 'dist/riff-chunks.min.js',
        banner: license,
        footer: 'window["riffChunks"]=riffChunks;'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      closure({
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'SIMPLE',
        warningLevel: 'VERBOSE'
      })
    ]
  }
];
