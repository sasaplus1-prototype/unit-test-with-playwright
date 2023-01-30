const path = require('node:path');

const config = {
  context: path.resolve(__dirname),
  devtool: 'inline-source-map',
  entry: {
    a1: './a-1',
    b1: './b-1',
  },
  mode: 'development',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  output: {
    filename: 'webpack-[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      type: 'window'
    },
  },
  resolve: {
    extensions: ['.ts', '...']
  },
  target: 'web'
}


module.exports = config;
