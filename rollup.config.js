/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

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
  // umd
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/riff-chunks.umd.js',
        name: 'riff-chunks',
        format: 'umd'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  },
  // esm
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/riff-chunks.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  }
];
