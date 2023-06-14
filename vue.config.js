const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  configureWebpack: {
    // 关闭 webpack 的性能提示
     performance: {
       hints:false
     }
  }
}
