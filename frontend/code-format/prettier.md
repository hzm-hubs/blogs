# Prettier

代码格式工具，官网地址：https://www.prettier.cn

## 1 安装

`npm i prettier - D`

## 2 配置文件
- 项目根目录下以 JSON 或 YAML 编写的文件.prettierrc
  `.prettierrc.json`、`.prettierrc.yml`、`.prettierrc.yaml`或`.prettierrc.json5`文件
-  使用导出对象`module.exports`的js文件
  、`.prettierrc.cjs`、`prettier.config.js`
- `package.json` 中的 `prettier` 字段
  
## 3 `.prettierignore`
  在该文件中设置不被`prettier`检查的文件或文件夹,如：
  ```
  /node_modules
  /dist
  ```
## 保存感知
每次保存代码，会在终端的输出拦下有打出
![alt text](../assets/prettier1.png)

## 实际问题

- 1 当项目首次安装prettier后，运行项目会出现提示prettier的相关报错，如:

  `Line 16:9:  Delete `⏎↹↹↹↹⏎↹↹↹`  prettier/prettier`

  应该是首次安prettier后，应是其检测到项目中有代码格式不符合配置规则，按照报错提示到目标文件修改、若编辑器设置了保存自动格式文件代码可直接在该页面<font color='red'>保存</font>操作
- 2 若安装后，保存文件没有格式化文件，请检查是否配置了浏览器setting

.vscode/setting.json
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  
  "editor.formatOnSave": true,
  
  "files.autoSave": "onFocusChange",
  
  "[javascript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
      "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true
  },
  
  "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact",
      "vue"
  ]
}
```

## 拓展插件

"prettier-plugin-organize-imports" 保存代码时自动删除已声明但从未读取其值的变量
```
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "overrides": [{ "files": ".prettierrc", "options": { "parser": "json" } }],
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-packagejson"]
}
```