const path = require('path');

module.exports = {
  lintOnSave: true,
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'));
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('dist'))
      .end()
      .exclude.add(path.resolve('public'))
      .end();
    config.module
      .rule('js')
      .include
      .add('/packages')
      .end()
      .use('babel')
      .loader('babel-loader');
  },
};
