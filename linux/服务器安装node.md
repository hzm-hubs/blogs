服务器首次链接，安装node,yarn,cnpm等插件
1.安装 node 
Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：
node.js官网下载地址
```
# cd /usr/local/src/
# wget https://nodejs.org/dist/v14.16.1/node-v14.16.1-linux-x64.tar.xz    // 下载
# tar xf node-v14.16.1-linux-x64.tar.xz         // 解压
# cd node-v14.16.1-linux-x64/                   // 进入解压目录
# ./bin/node -v                                 // 执行node命令 查看版本
v14.16.1
```
解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：
```
# ln -s /usr/local/src/node-v14.16.1-linux-x64/bin/node /usr/bin/node
# node -v
v14.16.1

# ln -s /usr/local/src/node-v14.16.1-linux-x64/bin/npm /usr/bin/npm
# npm -v
6.14.12
```
但是更建议通过nvm安装，管理node版本
下面的安装路径，在 nvm 官方文档 中有。
```
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
或
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```
安装之后再根目录下编辑.bashrc文件,添加以下语句
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm
```
保存退出后，重新载入 .bashrc
```
source ~/.bashrc
// 通过版本查看安装是否成功
nvm -v

// nvm 安装node
nvm install 16
···
2. 通过npm全局安装yarn
```
npm i yarn -g
```