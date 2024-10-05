在小程序中安装 node-sassv4.14.1 (兼容node14及以下版本)版本 提示未找到node-sass安装报错
```
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-sass@4.14.1 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR! 
npm ERR! Failed at the node-sass@4.14.1 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /Users/huangliuliu/.npm/_logs/2024-03-04T09_53_10_575Z-debug.log
```
安装网上所指指定node-sass的二进制下载地址安装
```
npm install node-sass@4.14.1 --sass_binary_site=https://registry.npmmirror.com/-/binary/node-sass
```
也会提示错误因为该地址下没有针对M1的arm版本
```
Downloading binary from https://registry.npmmirror.com/-/binary/node-sass/v4.14.1/darwin-arm64-83_binding.node
Cannot download "https://registry.npmmirror.com/-/binary/node-sass/v4.14.1/darwin-arm64-83_binding.node":
```
解决方法

1.卸载node-sass 转而 使用 sass(node16+) 插件, 注意 sass 不等于 sass-loader
```
npm uninstall node-sass
npm install --save-dev sass
```
2.卸载已安装的node-sass ，换到X64架构再进行安装
```
rm -rf node_modules
npm install --target_arch=x64
```
3.终端安装 rosetta2
由于 M1 芯片底层架构和过去不同，由此带来的应用生态兼容性问题是首先需要解决的，为此苹果也开启了为期两年的 Mac 过渡计划。具体来说，苹果借助的是 macOS 11 Big Sur 系统以及其内置的 Universal 2、Rosetta 2 和 Virtualizaion 三种技术来解决问题。
