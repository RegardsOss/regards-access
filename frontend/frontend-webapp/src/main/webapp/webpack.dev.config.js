// Webpack configuration file
const CommonConfig = require("./webpack.common.config")
const webpack = require('webpack')
const merge = require('webpack-merge');

var config = CommonConfig;

config = merge(config, {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "cheap-module-source-map",
  devServer: {
    stats: {
      children: false,
      colors: true
    },
    // Web directory serve by the webpack dev server
    contentBase: __dirname,
    // ??? Without this there is no hot replacement during developpment
    inline: true,
    //inline: true,
    port: 3333,
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
  },
  plugins: [
    // Allow to define React as a global variable for JSX.
    new webpack.ProvidePlugin({"React": "react",}),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('development')
      }
    }),
  ]
});

module.exports = config
