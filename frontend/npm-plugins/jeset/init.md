Jest 是 Facebook 出品的一个 JavaScript 开源测试框架。相对其他测试框架，其一大特点就是就是内置了常用的测试工具，比如零配置、自带断言、测试覆盖率工具等功能，实现了开箱即用。

Jest 适用但不局限于使用以下技术的项目：Babel,、TypeScript、 Node、 React、Angular、Vue 等。

Jest 主要特点：

* 零配置
* 自带断言
* 而作为一个面向前端的测试框架， Jest 可以利用其特有的快照测试功能，通过比对 UI 代码生成的快照文件，实现对 React 等常见前端框架的自动测试。
* 此外， Jest 的测试用例是并行执行的，而且只执行发生改变的文件所对应的测试，提升了测试速度。
* 测试覆盖率
* Mock 模拟

#### 使用方法

* 安装
  
```terminal
npm i jest --save-dev
```

* 在 package.json 文件中添加执行命令

```json
scripts: {
    "test": "jest --watchAll",
}
```

* 配置 jest

(1)通过jest --init单独生成jest配置文件
```
jest --init
```
执行该命令，可以生成jest.config.js配置文件，我们可以对其中的一些属性进行全局修改。

(2)通过 cli 命名行参数配置。

即除了可以通过配置文件去配置相关属性外，我们也可以直接在执行命令的时候，指定相关参数。例如：

```
npx jest 01/demo.test.js --watchAll // 测试指定文件
```

这里我们说明一下：-watchAll 属性

```
jest --watchAll // 直接监视所有文件
jest --watch // 需要和git配合使用，也就是说只会监视git中已修改且未添加到暂存区的文件，
```

3） 可以在项目 package.json 里的 "jest" 键进行配置 Jest，如：
需要安装相关插件 `npm i jest vue-jest babel-jest ts-jest -D`, 注意 vue-jest 适用于 vue2 版本，vue3 使用 @vue/vue3-jest
```
{
  "name": "my-project",
  "jest": {
    "testUrl": "http://localhost/",
    "moduleFileExtensions": [
      "js",
      "json",
      "vue",
      "ts"
    ],
    "transform": {
      ".*\\.(vue)$": "vue-jest",
      "^.+\\.js$": "babel-jest"
      "^.+\\.ts$": "ts-jest"
    },
  }
}
```
参考：https://juejin.cn/post/7080342960390275086?searchId=202406041033321DEAD586629E3B130A28

官方：https://github.com/jestjs/jest 、
https://jestjs.io/zh-Hans/docs/api
