
问题：
 node12 运行 jest-cli@29 会提示 SyntaxError: Unexpected token '.'
```
node ./node_modules/jest-cli/build/run.js

// 输出
/node_modules/jest-cli/build/run.js:135
    if (error?.stack) {
              ^
SyntaxError: Unexpected token '.'
    at wrapSafe (internal/modules/cjs/loader.js:915:16)
    at Module._compile (internal/modules/cjs/loader.js:963:27)
```

原因：

Node.js 13 及以下版本目前不支持可选链接`?.`。 Node.js 版本 14 和大多数浏览器都将支持它，因为它已移至第 4 阶段。目前，支持它的平台很少。您可以在给定 链接 中找到支持可选链接的平台列表。您可以使用 --harmony 标志启用可选。而运行的vue、react项目可以通过babel插件支持可选链写法。

解决：
* 升级使用的 node 版本到14以上
* 降低插件版本到不使用`?.`, jest@26及以下没使用可选链条
* 启用 harmony 标志