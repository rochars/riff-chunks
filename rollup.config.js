/*
 * https://github.com/rochars/byte-data
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 */

/**
 * @fileoverview rollup configuration file.
 * One dist file is created:
 * - riff-chunks.esm.js, ES6 module. All dependencies included.
 */

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: 'main.js',
    output: [
      {
        file: 'dist/riff-chunks.esm.js',
        format: 'es'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
    ]
  }
];