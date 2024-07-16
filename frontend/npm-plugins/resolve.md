当安装的插件与已安装插件的依赖有版本冲突时会提示：

如安装 

```
npm i html-webpack-plugin -D
```
提示：

![img](../assets/resolve_error.png "resolve_error")

解决：
+ 1.安装已安装插件提示的版本
```
npm i html-webpack-plugin@4 -D
```

+ 2.升级webpack@4到5版本