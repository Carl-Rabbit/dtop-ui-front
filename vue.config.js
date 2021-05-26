module.exports = {
  devServer: {
    open: false,
    host: 'localhost',
    port: 8080,
    https: false,

    proxy: {
      '/api': {
        target: 'http://192.168.202.243:8079/api/',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
