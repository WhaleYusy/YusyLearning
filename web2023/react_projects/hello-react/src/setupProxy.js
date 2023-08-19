const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api1',{
      target: "http://localhost:5000",
      // changeOrigin: true, // 控制服务器收到的请求头中的Host字段的值
      pathRewrite: {"^/api1": ""}
    }),
    createProxyMiddleware('/api2',{
      target: "http://localhost:5001",
      changeOrigin: true,
      pathRewrite: {"^/api2": ""}
    })
  )
}