const path = require('path')  // 内置的模块
module.exports = {
  webpack: {
    // 别名配置
    alias: {
      // 约定：使用 @ 表示 src 文件所在路由
      '@': path.resolve(__dirname, 'src')
    }
  }
}