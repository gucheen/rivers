/**
 * Created by gucheng on 5/16/16.
 */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    sw: [
      './src/sw.ts',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map'
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: ['awesome-typescript-loader'],
      include: [
        path.resolve(__dirname, 'src'),
      ],
    }, ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify('dev')
    }),

    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'eval',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080,
  },
  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.json', '.ts']
  },
};
