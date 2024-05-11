# eslint

`esLint` 是一个可配置的 JavaScript 检查器。它可以帮助你

- 检测代码质量、漏洞

- 设置代码格式
  
官网地址: https://zh-hans.eslint.org

## 1 安装

  `npm i eslint -D`

## 2 配置文件格式

- 根目录下的eslint文件：`.eslintrc.js`、`.eslintrc.json`、`.eslintrc.cjs`。
  
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
- 编辑器设置如`vscode`，安装`ESlint`扩展插件后，在`vscode`的全局设置文件`setting.json`中设置eslint规则。
  
## 3 `.eslintignore`
  在该文件中设置不被eslint检查的文件或文件夹,如：
  ```
  /node_modules
  /dist
  ```
## 4 相关npm插件

- eslint-config-prettier、eslint-plugin-prettier

  当项目中同时存在`eslint`与`prettier`俩个代码格式工具, 通过eslint的相关插件解决`eslint`、`prettier`中的冲突。 `eslint-config-prettier` 会关闭可能与`prettier`有冲突的格式化规则, `eslint-plugin-prettier` 把`prettier`配置成ESLint的一个插件，让其当做一个linter规则来运行。

  步骤如下:

  - 1.安装 eslint-config-prettier、eslint-plugin-prettier
  
    `npm i eslint-config-prettier eslint-plugin-prettier -D`

  - 2.在项目根目录下的.eslintrc.js中添加prettier配置：
    ```
      {
        extends: ['prettier','plugin:prettier/recommended'],
        plugins: ["prettier"], // 注册该prettier插件
        rules: {
            "prettier/prettier": "error", // 在eslint中运行prettier，并启用该插件提供的规则
        }
      }
    ```

- eslint-plugin-jsx
  
  添加对 jsx 语法的支持、校验

- eslint-config-import

## 5 配置

### rules

格式：`规则ID: 值类型`

值类型如下：
* "off"或者0   // 关闭检测规则
* "warn"或者1  // 打开并把打开的检测规则作为警告（不影响退出代码）
* "error"或者2 // 打开并把检测规则作为一个错误（退出代码触发时为1）
  
```
// 如
{
  rules: {
    'no-undef': 0, // 不能有未定义的变量
    'no-undef-init': 2, // 变量初始化时不能直接给它赋 undefined
    'no-undefined': 2, // 不能使用undefined
  }
}

// 关闭装饰器@校验 配置 no-restricted-syntax 
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      { 
        "selector": "Decorator", 
        "message": "禁止使用装饰器" 
      },
      { 
        "selector": "ExportDefaultDeclaration[declaration.type='ClassDeclaration']", 
        "message": "禁止使用默认导出类声明" 
      }
    ]
  }
}
```
		