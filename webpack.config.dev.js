import path from 'path';

export default {
  mode: 'development',
  devtool: 'eval-source-map',
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    publicPath: './js/',
    filename: 'bundle.js'
  },
  plugins: [],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},
      {test: /\.css$/, use: ['style-loader','css-loader']}
    ]
  }
}