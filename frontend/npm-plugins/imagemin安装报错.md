1.  imagemin 插件

在vite项目中引入imagemin依赖时，会报错，提示在安装imagemin-gifsicle时卡住
```
npm ERR! code 1
npm ERR! path /Users/huangliuliu/Downloads/public-portal/node_modules/gifsicle
npm ERR! command failed
npm ERR! command sh -c node lib/install.js
npm ERR! ⚠ Response code 404 (Not Found)
npm ERR!   ⚠ gifsicle pre-build test failed
npm ERR!   ℹ compiling from source
npm ERR!   ✖ Error: Command failed: /bin/sh -c autoreconf -ivf
npm ERR! /bin/sh: autoreconf: command not found
```
需要单独手动安装：
```
// yarn:
yarn add imagemin-jpegtran imagemin-mozjpeg imagemin-svgo imagemin-gifsicle imagemin-optipng imagemin-pngquant --dev
#然后在安装依赖
// npm :
npm i imagemin-jpegtran imagemin-mozjpeg imagemin-svgo imagemin-gifsicle imagemin-optipng imagemin-pngquant -D
```