在jest原生测试框架中，无法使用es6的import export语法，只能使用commonJS语法

### 解决方法

* 在项目根目录下添加.babelrc文件
* 
```json
{
  "env": {
    "test": {
      "plugins": ["@babel/plugin-transform-modules-commonjs"]
    }
  }
}
```

* 安装ES6语法解析转换插件
  
 ```
 npm install --save-dev @babel/plugin-transform-modules-commonjs
 ``` 

* 需要测试报告
```
  "jest": {
    "collectCoverage": true
  },
```

 参考：https://juejin.cn/post/6990172738853797902