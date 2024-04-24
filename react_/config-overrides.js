const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
  disableEsLint,
  addWebpackPlugin,
  overrideDevServer
} = require('customize-cra');
const path = require('path');
const log = require('./config/progressPlugin');
const incrementVersion = require('./config/incrementVersion');
const CRA = override(
  addDecoratorsLegacy(),
  disableEsLint(),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src/'),
    '@@': path.resolve(__dirname, 'src/assets/images/')
  }),
  addWebpackPlugin(log),
  incrementVersion()
);

module.exports = {
  webpack: CRA,
  devServer: overrideDevServer((config) => {
    return {
      ...config,
      proxy: {
        '/api': {
          target: process.env.REACT_APP_API_URL,
          changeOrigin: true,
          secure: true,
          pathRewrite: {
            '^/api': ''
          }
        },
        [process.env.REACT_APP_STATIC_PATH]: {
          target: process.env.REACT_APP_STATIC_URL,
          changeOrigin: true,
          secure: true,
          pathRewrite: {
            [`^${process.env.REACT_APP_STATIC_PATH}`]: ''
          }
        }
      }
    };
  })
};
