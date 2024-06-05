# Babel

Babel 是一个工具链，主要用于将采用 ECMAScript 2015+ 语法编写的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。（把浏览器不认识的语法，编译成浏览器认识的语法。）

官网：https://www.babeljs.cn/docs/options

## 1 安装

`npm i babel -D`

## 2 配置文件

- .babelrc
  
- .babelrc.js、.babelrc.json、.babelrc.cjs、.babelrc.* (js、json文件需要使用 module.exports 导出)

- babel.config.js、babel.config.json、babel.config.*
  
- package.json 中配置 babel 字段

## 3 主要参数

### 3.1 cwd

当前工作目录。所有以编程方式传递进来的路径都相对于当前工作目录开始解析。默认当前进程目录 process.cwd()
  
### 3.2 filename
  
### 3.3 root
  
### 3.4 code

### 3.5 parserOpts

parserOpts包含一些可配置的选项，用于指定Babel解析器的行为和功能。，在极少数情况下（如果尚未实现转换，或者没有默认方法来执行此操作），您可以使用插件，例如仅@babel/plugin-syntax-bigint允许 Babel解析特定类型的语法。或者你想保留源代码，因为你只想 Babel 进行代码分析或代码修改。

```
{
  "parserOpts": {
    "plugins": ['jsx', 'flow']
  }
}
```

以下是一些常见的parserOpts选项：

- parser：指定要使用的解析器，默认为@babel/parser。你可以选择其他解析器，如babel-eslint或typescript-eslint-parser。

- strictMode：设置是否启用ECMAScript严格模式解析。默认为false，表示不启用严格模式。

- plugins：指定解析器的插件。这些插件用于支持解析特定的语言扩展或语法规范，例如Flow注解、jsx或decorators。

- sourceType：指定代码的来源类型，可以是"script"（脚本）或"module"（模块）。默认为"module"，表示解析模块代码。

- allowImportExportEverywhere：设置是否允许在任意位置使用import和export语句。默认为false，表示只能在模块顶层和函数内使用这些语句。

- allowReturnOutsideFunction：设置是否允许在函数外部使用return语句。默认为false，表示只能在函数内部使用return语句。

- locations：设置是否在AST节点上记录每个节点在源代码中的位置信息。默认为false，表示不记录位置信息。


### 3.6 presets

presets 是一组预定义的插件集合，用于指定要在代码转换过程中使用的转换规则。它可以让你方便地一次性添加一组相关的转换插件，而不需要逐个添加每个插件。

以下是一些常用插件

- @babel/cli: Babel附带了一个内置的CLI，可用于从命令行编译文件。

- @babel/core: 使用本地配置文件

- @babel/preset-env: 这是Babel的主要preset，根据目标环境自动确定需要的插件和转换规则。它可以根据你所配置的目标浏览器、Node.js版本或其他运行环境，自动启用适当的转换插件。

- @babel/preset-react: 用于转换React代码的preset。它能够将JSX语法转换为普通的JavaScript代码，以及提供一些与React开发相关的转换规则。
  
如支持jsx语法，需要 @babel/preset-react、 @babel/core俩个依赖：

- 1 安装依赖
  
  `npm install @babel/preset-react @babel/core -D`

- 2 添加到babel中

```
{
  "presets": ['@babel/preset-react']
}
```

- @babel/preset-typescript: 用于转换TypeScript代码的preset。它可以将TypeScript的特定语法和类型注解转换为JavaScript代码。

- @babel/preset-flow: 用于转换Flow代码的preset。Flow是JavaScript的静态类型检查工具，而这个preset可以将Flow的类型注解和语法转换为普通的JavaScript代码。
  
- @babel/plugin-proposal-class-properties: 通过 Polyfill 方式在目标环境中添加缺失的特性
  
- @babel/polyfill: 编译 class

此外 presets 中插件加载顺序与配置顺序是相反的

- 插件在 Presets 前运行。
- 插件顺序从前往后排列。
- Preset 顺序是颠倒的（从后往前）

### 3.7 plugins

大多数语法都可以通过 Babel 进行转换。在极少数情况下（如果尚未实现转换，或者没有默认方法来执行此操作），您可以使用插件，例如仅@babel/plugin-syntax-bigint允许 Babel解析特定类型的语法。或者你想保留源代码，因为你只想 Babel 进行代码分析或代码修改。

plugins是数组格式，将插件名以字符格式添加其中即可，如`@babel/plugin-transform-runtime`,但是有些插件需要设置参数项如<font color='red'>legacy、loose</font>

* 如安装修饰器@语法
  
  + 1.安装 `npm i @babel/plugin-proposal-decorators -D`

  + 2.在.babelrc 配置文件中启用
    ```
    {
        plugins: [
            ['@babel/plugin-proposal-decorators',{legacy: true}]
        ]
    }
    ```

* 支持可选链语法
  
  + 1.安装插件 `@babel/plugin-transform-optional-chaining`
  
  + 2.在.babelrc 配置文件中启用 
  
    ```
    plugins: [
      ['@babel/plugin-transform-optional-chaining']
    ]
    ```

  
### PS：版本差异，babel发展久远，插件依赖之间有捆绑兼容

+ babel 6.23 以后 @babel/core 搭配 @babel/preset-env、@babel/plugin-transform-runtime

  ```
  {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"]
  }
  ```

+ babel 6.23 以前 是 babel-core 搭配 babel-preset-env, babel-plugin-transform-runtime（注册使用可以简写）

```
  {
    presets: ["env"],
    plugins: ["transform-runtime"]
  }
```