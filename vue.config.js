const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'RSS mailer'
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/rss-reader-mailer/dist' : '/'
})
