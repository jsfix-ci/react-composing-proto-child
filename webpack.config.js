const webpack = require('webpack');
const path = require('path');
const optimize = process.env.NODE_ENV === 'production';

const paths = {
  build: path.resolve(__dirname, 'public/build'),
  src: path.resolve(__dirname, 'src')
};

const config = {
  entry: {
    standalone: [
      'webpack-dev-server/client?http://localhost:3000',
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      paths.src + '/index.jsx'
    ],
    component: [
      // include this one only when parent app doesn't polyfill too
      // 'babel-polyfill',
      paths.src + '/main.js'
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        include: paths.src,
        loaders: optimize ? ['babel'] : [/*'react-hot',*/ 'babel'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()//,
//    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'eval',
  output: {
    path: paths.build,
    filename: 'bundle-[name].js',
    publicPath: '/build/',

    libraryTarget: 'umd',
    library: 'reactComposingProtoChildApp'

  }
};

if (optimize) {
  /* eslint-disable fp/no-mutation */
  config.entry = Object.keys(config.entry).reduce((output, key) => {
    output[key] = config.entry[key].filter(e => !/dev-server/.test(e));
    return output;
  }, {});

  config.plugins = [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ];
  config.devtool = 'cheap-module-source-map';
}
module.exports = config;
