const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: "production",
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/bundle.js'
  },
  devtool: "eval-source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([
      {
      from: "public/index.html",
      }
    ]),
    new CopyPlugin([
      {
      from: "public/design.css",
      to: "static/design.css"
      }
    ]),
    new CopyPlugin([
      {
        from: "public/images",
        to: "static/images"
      }
    ])
  ],
  module: {
    rules: [
      {
            test:/\.css$/i,
            use:['style-loader','css-loader'],
      },
      {
   test: /\.(woff|woff2)$/i,
   use: [
        {
          loader: 'file-loader',
            options:{
              outputPath: "static/fonts"
            }
          },
        ],
      },

      {
          enforce: 'pre',
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
              failOnError: true,
          },
     },
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: 'babel-loader'
     },
     {
       test: /\.(jpe?g|png|gif|svg)$/i,
       loader: "file-loader"
     }
   ]
 },
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};
