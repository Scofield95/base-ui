const path = require('path')

module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve('packages'))
    config.resolve.alias
      .set('src', path.resolve('src'))
  }
}
