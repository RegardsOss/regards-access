// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

// Webpack configuration file
const CommonConfig = require("../webpack.common.config")
const webpack = require('webpack')
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path');

var config = CommonConfig;
// Reset loaders
config.module.loaders = [];
config.module.plugins = [];
config = merge(config, {
  plugins: [
    // your custom plugins
    new webpack.ProvidePlugin({"React": "react",}),
  ],
  module: {
    loaders: [// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      {
        test: /\.tsx{0,1}?$/,
        exclude: [/node_modules/, /json/, /web_modules\/.*\/index\.d\.ts$/],
        loaders: ["babel-loader", "ts-loader"]
      },
      // Transpile ES6 Javascript into ES5 with babel loader and react
      {
        test: /\.js$/,
        exclude: [/node_modules/, /json/, /\/\..*/],
        loader: 'babel',
        query: {
          presets: ['es2015', 'react'],
        }
      },
      {
        test: /\.jsx$/,
        exclude: [/node_modules/, /json/],
        loader: 'babel'
      },{
        test: /\.css?$/,
        exclude: [/node_modules/, /json/],
        loaders: [
          require.resolve('style-loader'),
          require.resolve('css-loader'),
          require.resolve('postcss-loader'),
        ],
      },
      {
        test: /\.(jpg|png|gif|eot|svg|ttf|woff|woff2)(\?.*)?$/,
        exclude: [/node_modules/, /json/],
        loader: require.resolve('file-loader'),
        query: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
    ]
  },
  devServer: {
    // Enable rewrite urls for navigation routes generated by the router.
    // Necessary to fallback to root directory when attempt to load
    // webpack generated javascripts.
    historyApiFallback: {
      // Rewrite to get bundle.js
      rewrites: [{
        from: /\/bundle\.js(\.map)?/,
        to: function (context) {
          return context.match[0]
        }
      }
      ]
    }
  }
});

module.exports = config
