# eslint

`esLint` 是一个可配置的 JavaScript 检查器。它可以帮助你

- 检测代码质量、漏洞

- 设置代码格式
  
官网地址: https://zh-hans.eslint.org

## 1 配置文件

- 根目录下的eslint文件：`.eslintrc.js`、`.eslintrc.json`、`.eslint.config.js`。
  
  *.js文件：

  ```
    module.exports = {
        root: ……,
        globals:{
            ……
        },
        extends:  [
            ……
        ],
        rules: [
            ……
        ]
    }
  ```

  *.json 文件
    ```
    {
        root: ……,
        globals:{
            ……
        },
        extends:  [
            ……
        ],
        rules: [
            ……
        ]
    }
  ```
  js文件需要使用导出`module.exports`

- 项目的`package.json`文件中配置`eslintConfig`字段。

  ```

    eslintConfig: {
        ……
    }
  ```
- 编辑器设置，如`vscode`中安装eslint扩展插件后，在`vscode`的全局设置文件(setting.json)中设置eslint规则。
  
## 2 `.eslintignore`
  在该文件中设置不被eslint检查的文件或文件夹,如：
  ```
  /node_modules
  /dist
  ```