const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require("webpack")

module.exports = {
  // the output bundle won't be optimized for production but suitable for development
  mode: 'development',
  // the app entry point is /src/index.js
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
  	// the output of the webpack build will be in /dist directory
    path: path.resolve(__dirname, 'dist'),
    // the filename of the JS bundle will be bundle.js
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
      	// for any file with a suffix of js or jsx
        test: /\.jsx?$/,
        // ignore transpiling JavaScript from node_modules as it should be that state
        exclude: /node_modules/,
        // use the babel-loader for transpiling JavaScript to a suitable format
        loader: 'babel-loader',
        options: {
          
          presets: ["@babel/preset-env", "@babel/preset-react", { 'plugins': ['@babel/plugin-proposal-class-properties'] }]
        }
      },
      // Added this loader to make webpack be able to load css
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
       // Added this loader in order to get rid of related  404 warnings 
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },


    ]
  },
  // add a custom index.html as the template
  plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src', 'index.html') })
    , new SourceMapDevToolPlugin({ filename: "[file].map" })],
  // Added the SourceMap plugin in order to get rid of related  404 warnings 
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost.rakuten.tv',
    port: 3000,
    allowedHosts: [
      'localhost.rakuten.tv'
    ]
    // this domain localhost.rakuten.tv need to be in allowd hosts otherwise
    // it refuses the connection
  }
};