var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './build/');
var APP_DIR = path.resolve(__dirname, './client');

const config = {
   entry: {
     main: APP_DIR + '/index.js'
   },
   output: {
     filename: 'bundle.js',
     path: BUILD_DIR,
   },
   module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "client/css/fonts/[name].[ext]",
        },
      },
     {
       test: /(\.css|.scss)$/,
       use: [{
           loader: "style-loader" // creates style nodes from JS strings
       }, {
           loader: "css-loader" // translates CSS into CommonJS
       }, {
           loader: "sass-loader" // compiles Sass to CSS
       }]
     },
     {
       test: /\.(jsx|js)?$/,
       use: [{
         loader: "babel-loader",
         options: {
           cacheDirectory: true,
           presets: ['react', 'es2015', "stage-0"] // Transpiles JSX and ES6
         }
       }]
     }
    ]

  }
};

module.exports = config;