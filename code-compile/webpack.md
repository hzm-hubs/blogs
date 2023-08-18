# Webpack

webpack 是一个现代 JavaScript 应用程序的静态模块打包器, 将所有模块引入整理后，通过 loader 和 plugin 处理后，打包输出。（主要用于项目打包）

官网：https://webpack.docschina.org/concepts/

## 1 安装

`npm i webpack -D`

## 2 配置文件

- webpack.config.js
  
## 3 常用配置
webpack.config.js:
```
// 需要使用到的依赖
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
    // 模式
    mode: 'development',

    // 入口文件，单个入口填写文件相对路径即可，多个入口按照数组格式
    entry: './path/to/my/entry/file.js',

    // 出口文件，项目打包完成的存放地址
    output: {
        filename: '[name].js',
        path:path.resolve(__dirname, 'dist'),, 
    }

    //  模块
    module：{
        // loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件，css-loader、
        ts-loader 为具体npm插件， `test`是声明使用loader的文件类型， use 也可以数组接受多个loader
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    }

    // plugin 目的在于解决 loader 无法实现的其他事
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
};
```

PS: webpack 可以通过 `babel-loader` 使用 Babel