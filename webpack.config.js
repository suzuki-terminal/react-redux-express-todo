const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'eval',

  resolve: {
    extensions: ['', '.js']
  },

  context: __dirname + '/src',

  entry: {
    javascript: './index.js',
    html: './index.html'
  },

  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          cacheDirectory: true
        }
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]"
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?mimetype=image/svg+xml'
      },
      {
        test: /\.woff$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.woff2$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.eot$/,
        loader: 'url-loader?mimetype=application/font-woff'
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader?mimetype=application/font-woff'
      }
    ]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new WebpackNotifierPlugin({ alwaysNotify: true })
  ],

  devServer: {
    inline: true
  }
};
