/*!
 * Copyright (c) 2017 Rafael da Silva Rocha.
 * https://github.com/rochars/riff-chunks
 *
 */

module.exports = {
  entry: './index.js',
  output: {
    filename: './dist/riff-chunks.js'
  },
  module: {
    loaders: [
      {
        test:  /index\.js$/,
        loader: 'string-replace-loader',
        query: {
          multiple: [
            {
              search: 'module.exports',
              replace: "window['riffChunks']"
            }
          ]
        }
      }
    ]
  }
};