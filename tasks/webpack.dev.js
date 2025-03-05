const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  output: {
    publicPath: '/js',
    filename: 'origo.js',
    library: {
      type: 'var',
      export: 'default',
      name: 'Origo'
    }
  },
  devServer: {
    static: {
      directory: './'
    },
    port: 9966,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('*.terrain', function(req, res, next) {
        req.url = req.url + '.gz';
        res.set('Content-Encoding', 'gzip');
        next();
      });
      return middlewares;
    }
  },
  devtool: 'eval-cheap-source-map',
  plugins: [
    new CompressionPlugin({
      filename: '[path][base].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.terrain$/, // Include .terrain files
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
