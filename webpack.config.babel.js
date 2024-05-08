import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WebpackShellPlugin from 'webpack-shell-plugin-next';

module.exports = () => {
  const plugins = [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'images/**/*', to: '', context: 'source/assets/' },
        { from: 'videos/**/*', to: '', context: 'source/assets/' },
        { from: 'source/assets/fonts/**/*', to: '', context: '.' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new WebpackShellPlugin({
      onBuildStart: {
        scripts: ['npx gulp'],
      },
      onAfterDone: {
        scripts: ['npx gulp'],
      },
    }),
  ];

  return {
    entry: {
      app: path.resolve(`source/scripts/app`),
      home: path.resolve(`source/scripts/home`),
      house: path.resolve(`source/scripts/house`),
      rules: path.resolve(`source/scripts/rules`),
      players: path.resolve(`source/scripts/players`),
      memories: path.resolve(`source/scripts/memories`),
      draft: path.resolve(`source/scripts/draft`),
    },
    devtool: 'eval',
    output: {
      path: path.resolve('build'),
      filename: '[name].js',
    },
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
          test: /\.js?$/,
          use: ['babel-loader'],
        },
        {
          test: /\.ts?$/,
          use: ['ts-loader'],
          exclude: [/node_modules/],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
        },
      ],
    },
    plugins: plugins,
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [
        path.resolve('source'),
        path.resolve('node_modules'),
        path.resolve('../../node_modules'),
      ],
    },
  };
};
