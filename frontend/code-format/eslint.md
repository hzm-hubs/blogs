# eslint

`esLint` 是一个可配置的 JavaScript 检查器。它可以帮助你

- 检测代码质量、漏洞

- 设置代码格式

官网地址: https://zh-hans.eslint.org

## 1 安装

`npm i eslint -D`

## 2 配置文件格式

- 根目录下的 eslint 文件：`.eslintrc.js`、`.eslintrc.json`、`.eslintrc.cjs`，注意：在 eslint9 以上版本需要是 <font color='yellow'>json 数组格式</font> 配置。

  \*.js 文件：

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

  \*.json 文件

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

  js 文件需要使用导出`module.exports`

- 项目的`package.json`文件中配置`eslintConfig`字段。

  ```

    eslintConfig: {
        ……
    }
  ```

- 编辑器设置如`vscode`，安装`ESlint`扩展插件后，在`vscode`的全局设置文件`settings.json`中设置 eslint 规则。

## 3 `.eslintignore`

在该文件中设置不被 eslint 检查的文件或文件夹,如：

```
/node_modules
/dist
```

## 4 相关插件

- 扩展支持 prettier

  当项目中同时存在`eslint`与`prettier`俩个代码格式工具, 通过 eslint 的相关插件解决`eslint`、`prettier`中的冲突。 `eslint-config-prettier` 会关闭可能与`prettier`有冲突的格式化规则, `eslint-plugin-prettier` 把`prettier`配置成 ESLint 的一个插件，让其当做一个 linter 规则来运行。

  步骤如下:

  - 1.安装 prettier、eslint-config-prettier、eslint-plugin-prettier

    `npm i prettier eslint-config-prettier eslint-plugin-prettier -D`

  - 2.在项目根目录下的.eslintrc.js 中添加 prettier 配置：
    ```
      {
        extends: ['plugin:prettier/recommended'],
        rules: {
            "prettier/prettier": "error", // 在eslint中运行prettier，并启用该插件提供的规则，检测代码报错
        }
      }
    ```

- eslint-plugin-jsx

  添加对 jsx 语法的支持、校验

- vue-eslint-parser

  支持解析 .vue 文件

- @typescript-eslint/parser

支持解析 `<script>` 块中的 TS

- eslint-plugin-import
  对 ES2015+的 import/export 语法进行检查和规范，以确保导入语句的正确性、防止拼写错误，并提高代码的可读性、可维护性。它能检测出诸如未解析的导入、重复导入、循环导入、未使用的导入等问题，并提供了许多用于规范导入顺序、限制路径等功能的规则

## 5 配置

### 常用

.eslintrc 示例

```json
{
  "root": true, // 覆盖下层配置
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "parser": "@typescript-eslint/parser",
    "ecmaVersion": "latest",
    "sourceType": "module",
    "extraFileExtensions": [".vue"]
  },
  // 'prettier','plugin:prettier/recommended' 二选一即可，都可以启用 prettier/prettier
  "extends": [
    "eslint:recommended", // eslint 推荐规则:
    "@typescript-eslint/recommended", // typescript-eslint 推荐规则
    "plugin:vue/vue3-recommended", // Vue3 推荐规则:
    "plugin:prettier/recommended", // 集成Prettier
    "./.eslintrc-auto-import.json" // 根据 unplugin-auto-import 生成的 eslint 全局合法变量文件
  ],
  "rules": {
    "prettier/prettier": "error", // 将不符合 prettier/prettier 的代码以错误跑出
    "vue/no-multiple-template-root": "off",
    "vue/multi-word-component-names": "off", // 允许 vue 组件使用单个单词命名
    "vue/no-v-html": "off", // 允许 v-html 写法
    "no-invalid-this": "off", // 允许 this 写法
    "@typescript-eslint/no-this-alias": "off"
  }
}
```

以前需要在 `rules` 中声明许多配置选项，现在通过 extends 引入一些推荐集合，如 `eslint:recommended`
### rules

格式：`规则ID: 值类型`

值类型如下：

- "off"或者 0 // 关闭检测规则
- "warn"或者 1 // 打开并把打开的检测规则作为警告（不影响退出代码）
- "error"或者 2 // 打开并把检测规则作为一个错误（退出代码触发时为 1）

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

### 报错提示

项目中代码编写报错会以 `eslint-${规则}` 展示。可以通过报错提示，修改编写格式，或者调整 eslint 配置文件