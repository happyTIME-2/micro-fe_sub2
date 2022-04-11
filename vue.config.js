const { defineConfig } = require("@vue/cli-service");

const { name } = require("./package");

module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === "production" ? "/sub-app2/" : "/",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: "umd", // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
  transpileDependencies: true,
});
