const path = require('path');

module.exports = {
  lintOnSave: true,
  pages: {
    index: {
      entry: 'packages/main.js',
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    console.log('fdfd');
    config.resolve.alias
      .set('@', path.resolve('examples'))
      .set('~', path.resolve('packages'));
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('dist'))
      .end()
      .exclude.add(path.resolve('public'))
      .end();
    // config.module
    //   .rule('js')
    //   .include
    //   .add('/packages/**/')
    //   .end()
    //   .use('babel')
    //   .loader('babel-loader');
    // config.module
    //   .rule('vue').clear()
    //   .use('vue-loader')
    //   .loader('vue-loader');
  },
};
