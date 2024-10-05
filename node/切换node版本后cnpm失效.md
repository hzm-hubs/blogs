使用 12 版本的 node 安装 cnpm 后，
````
cnpm -v 
```
终端输出
```
cnpm@7.1.0 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/lib/parse_argv.js)
npm@6.14.15 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/node_modules/npm/lib/npm.js)
node@12.22.7 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/bin/node)
npminstall@5.3.1 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/node_modules/npminstall/lib/index.js)
prefix=/Users/huangliuliu/.nvm/versions/node/v12.22.7 
darwin arm64 21.1.0 
registry=https://registry.npmmirror.com
```
安装成功，切换 node 版本到 16 后，使用 cnpm 提示命令不存在
```
cnpm -v
zsh: command not found: cnpm
```
以为是 cnpm 失效切换回12版本 的node，执行 cnpm  -v，输出如下
```
cnpm@7.1.0 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/lib/parse_argv.js)
npm@6.14.15 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/node_modules/npm/lib/npm.js)
node@12.22.7 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/bin/node)
npminstall@5.3.1 (/Users/huangliuliu/.nvm/versions/node/v12.22.7/lib/node_modules/cnpm/node_modules/npminstall/lib/index.js)
prefix=/Users/huangliuliu/.nvm/versions/node/v12.22.7 
darwin arm64 21.1.0 
registry=https://registry.npmmirror.com
```
可能每个 cnpm 是安装到每个 node 版本里的，不像git、nvm 等，切换node可以重新安装cnpm
```
// 
$ npm install cnpm -g

// If you're in China, maybe you should install it from our China mirror:
$ npm install cnpm -g --registry=https://registry.npmmirror.com
```
