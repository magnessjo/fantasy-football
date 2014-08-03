// Variables

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const scriptFiles = {
  draft: path.resolve(`source/scripts/draft/`),
};

const styleFiles = {
  styles: path.resolve(`source/styles/master.css`),
};

const files = Object.assign(scriptFiles, styleFiles);

module.exports = (env) => {
  var cssLoaderOptions = {};

  var plugins = [
    new CopyWebpackPlugin([
      { from: 'images/**/*', to: '', context: 'source/assets/' },
      { from: 'videos/**/*', to: '', context: 'source/assets/' },
      { from: 'source/assets/fonts/**/*', to: '', flatten: true },
    ]),
    new ExtractTextPlugin('[name].css'),
    new webpack.DefinePlugin({
      PRODUCTION:
        env.NODE_ENV == 'production'
          ? JSON.stringify(true)
          : JSON.stringify(false),
    }),
  ];

  if (env.NODE_ENV == 'production') {
    plugins.push(
      new UglifyJsPlugin({
        test: /\.js($|\?)/i,
      }),
    );

    cssLoaderOptions.minimize = true;
  }

  return {
    entry: files,

    output: {
      path: path.resolve('build'),
      filename: '[name].js',
    },

    devtool: 'none',

    stats: {
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      errors: true,
      errorDetails: true,
      source: true,
      timings: true,
      warnings: true,
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
            },
          },
        },
        {
          test: /\.css?$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', options: cssLoaderOptions },
              'postcss-loader',
            ],
          }),
        },
      ],
    },

    plugins: plugins,

    resolve: {
      modules: [path.resolve('source'), path.resolve('node_modules')],
    },
  };
};
