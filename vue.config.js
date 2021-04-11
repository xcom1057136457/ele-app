module.exports = {
  publicPath: './',
  productionSourceMap: false,

  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://elm.cangdu.org', //代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //代理的路径
        }
      }
    }
  }
}