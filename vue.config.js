const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:  "/",
  css: {
    loaderOptions: {
      sass: {
        sassOptions: {
           prependData: `@import" ./src/assets/style/Helpers/mediaQueries.scss ";`,
        }
      }
    }
  },
})
