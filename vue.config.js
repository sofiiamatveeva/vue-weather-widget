const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    output: {
      filename: "weather-widget.js",
    },
  },
  css: {
    extract: false,
  },
});
