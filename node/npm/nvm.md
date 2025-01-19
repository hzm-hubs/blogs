nvm node包管理工具，可以自由切换node版本

苹果系统下可以通过在  https://github.com/nvm-sh/nvm  使用终端命令：
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```
安装完成，在终端输入`nvm` 返回 `nvm -help` 即安装完成

常用的 nvm命令
```
# 查看当前版本
nvm --version

# 查看已安装的node版本
nvm list (nvm ls)

# 安装 制定的 node 版本 12.22.0
nvm install v12.22.0

# 删除node版本
nvm uninstall v12.22.0

# 安装最近的稳定版本
nvm install --lts

# 切换 node 版本 到 16.13.1
nvm use v16.13.1
 
# 查看当前的 node 版本
nvm current
```

设置 node 常用版本，设置完可能需要重启编辑器，清空缓存才能生效
```
# 先设置默认版本为12.13.1
nvm alias default v12.13.1

# 使用默认版本
nvm use default
```
更多命令也可以在  https://github.com/nvm-sh/nvm  或者 官网查看