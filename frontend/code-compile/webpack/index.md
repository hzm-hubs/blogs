# Webpack

webpack 是一个现代 JavaScript 应用程序的静态模块打包器, 将所有模块引入整理后，通过 loader 和 plugin 处理后，打包输出。（主要用于项目打包）

官网：https://webpack.docschina.org/concepts/

也可以参考：https://developer.aliyun.com/article/891807

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
    // 模式 通过选择 development, production 或 none 之中的一个，其默认值为 production。
    // development：适用于开发阶段，优化了构建速度和调试体验。
    // production：适用于生产环境，优化了构建体积和执行效率。
    // none：不使用任何默认优化，需要手动配置所有选项。
    mode: 'development',

    // 打包目标环境, 默认 web，
    // 对于前端项目，通常使用 target: 'web'，也有 target: 'es2020'、target: 'browserslist'、target: ['web', 'es5']、
    // 而对于后端 Node.js 项目，使用 target: 'node'。
    // 如果你在构建跨平台的 Electron 应用，可能会使用 target: 'electron-main' 和 target: 'electron-renderer'。
    target: 'web'

    // 入口文件，单个入口填写文件相对路径即可，多个入口按照数组格式，默认值是 ./src/index.js
    entry: './path/to/my/entry/file.js',

    // 出口文件，项目打包完成的存放地址
    output: {
        filename: '[name].js',
        path:path.resolve(__dirname, 'dist'),, 
    }

    //  模块
    module：{
        // loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件，css-loader、
        ts-loader 为具体npm插件， `test`是声明使用loader的文件类型， use 也可以数组接受多个loader(file-loader、url-loader)
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.ts$/, use: 'ts-loader' },
        ],
    }

    // plugin 插件目的在于解决 loader 无法实现的其他事
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ template: './src/index.html' }),
    ],
};
```

PS: webpack 可以通过 `babel-loader` 使用 Babel