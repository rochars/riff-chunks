/**
 * Copyright (c) 2017-2018 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */
const ClosureCompiler = require('google-closure-compiler-js').webpack;
module.exports = {
  entry: './compile.js',
  output: {
    filename: './dist/riff-chunks-min.js'
  },
  plugins: [
    new ClosureCompiler({
      options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'ADVANCED',
        warningLevel: 'VERBOSE'
      }
    })
  ]
};