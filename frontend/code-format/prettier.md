# Prettier

代码格式工具，官网地址：https://www.prettier.cn

## 1 安装

`npm i prettier - D`

## 2 配置文件

- 项目根目录下以 JSON 或 YAML 编写的文件.prettierrc
  `.prettierrc.json`、`.prettierrc.yml`、`.prettierrc.yaml`或`.prettierrc.json5`文件
- 使用导出对象`module.exports`的 js 文件
  、`.prettierrc.cjs`、`.prettier.config.js`
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

- 1 当项目首次安装 prettier 后，运行项目会出现提示 prettier 的相关报错，如:

  `Line 16:9:  Delete `⏎↹↹↹↹⏎↹↹↹`  prettier/prettier`

  应该是首次安 prettier 后，应是其检测到项目中有代码格式不符合配置规则，

  - 按照报错提示到目标文件修改
  - 若编辑器设置了保存文件自动格式化代码，可直接在该页面执行 <font color='yellow'>保存</font> 操作

## 常用配置

.prettier.config.js

```js
module.exports = {
  printWidth: 180, // 单行输出（不折行）的（最大）长度
  tabWidth: 4, // 每个缩进级别的空格数
  tabs: true, // 使用制表符 (tab) 缩进行而不是空格 (space)。
  useTabs: true, // 使用制表符 (tab) 缩进行而不是空格 (space)。
  semi: false, // 是否在语句末尾打印分号
  singleQuote: true, // 是否使用单引号 true 使用 false 不使用
  quoteProps: "as-needed", // 仅在需要时在对象属性周围添加引号
  trailingComma: "none", // 去除对象最末尾元素跟随的逗号
  bracketSpacing: true, // 是否在对象属性添加空格
  arrowParens: "always", // 箭头函数，只有一个参数的时候，也需要括号
  proseWrap: "always", // 当超出print width（上面有这个参数）时就折行
  htmlWhitespaceSensitivity: "ignore", // 指定 HTML 文件的全局空白区域敏感度, "ignore" - 空格被认为是不敏感的
  jsxSingleQuote: false, // jsx 不使用单引号，而使用双引号
  jsxBracketSameLine: true, // 将 > 多行 JSX 元素放在最后一行的末尾，而不是单独放在下一行（不适用于自闭元素）,默认false,这里选择>不另起一行
  stylelintIntegration: true,
  endOfLine: "auto",
};
```

## 拓展插件

"prettier-plugin-organize-imports" 保存代码时自动删除已声明但从未读取其值的变量

```
{
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "all",
  "proseWrap": "never",
  "plugins": ["prettier-plugin-organize-imports", "prettier-plugin-packagejson"]
}
```
