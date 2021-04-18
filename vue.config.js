const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack(config) {
    config.resolve.alias
      .set('components', resolve('src/components'))
      .set('views', resolve('src/views'))
      .set('assets', resolve('src/assets'))
      // .set('data', resolve('/data'))
  },
  publicPath: process.env.NODE_ENV === 'production'? './': '/'
}