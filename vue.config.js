const path = require('path');

module.exports = {
  lintOnSave: true,

  chainWebpack: (config) => {
    config.resolve.alias
      .set('~', path.resolve('examples'))
      .set('@', path.resolve('packages'));
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('dist'))
      .end()
      .exclude.add(path.resolve('public'))
      .end();
  },
};
