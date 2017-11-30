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
              search: 'module.exports.read',
              replace: "window['riffChunks'] = window['riffChunks'] || {};" + 
                       "window['riffChunks']['read']"
            },
            {
              search: 'module.exports.write',
              replace: "window['riffChunks']['write']"
            }
          ]
        }
      }
    ]
  }
};