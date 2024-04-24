const webpack = require('webpack');
const packageJson = require('../package.json');
module.exports = () => (config) => {
  const version = packageJson.version
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env.REACT_APP_VERSION': JSON.stringify(version)
    })
  );
  config.plugins.push(
    function () {
      this.hooks.done.tap('WritePackageJsonPlugin', () => {
        process.env.REACT_APP_VERSION = version;
      });
    }
  );
  return config;
};
