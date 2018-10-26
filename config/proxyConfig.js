module.exports = {
  proxyList: {
    '/api': { //替换代理地址名称
      target: 'http://api.douban.com/', //代理地址
      changeOrigin: true, //可否跨域
      pathRewrite: {
        '^/api' //重写接口，去掉/api
      }
    }
  }
}
