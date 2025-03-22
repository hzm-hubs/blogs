小程序可以通过 miniprogram-to-uniapp 实现开发模式相互转译

miniprogram-to-uniapp (node 18 +): https://github.com/zhangdaren/miniprogram-to-uniapp

全局安装 miniprogram-to-uniapp，node版本需到18+

```
npm install miniprogram-to-uniapp -g
```
默认转换:

```
$ wtu -i "./miniprogram-project"
```
注："./miniprogram-project" 是要转换的小程序项目目录，如路径中有空格应该用引号引起来。

将 wxss 合并入 vue 文件:
```
$ wtu -i "./miniprogram-project" -m
```

转换项目为 vue-cli 项目:
```
$ wtu -i "./miniprogram-project" -c
```

将 template 里面的 import/template 和 include 标签转换为单独组件(实验性):

```
$ wtu -i "./miniprogram-project" -t
```
待命令行运行结束，会在小程序项目的同级目录有以 小程序项目名 + "_uni" 或 小程序目录名 + "_uni-cli" 目录，即是转换好的 uni-app 项目，转换好后，请使用 HBuilderX 导入并运行。