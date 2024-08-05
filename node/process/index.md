### process.cwd()

返回：<string>

process.cwd() 方法返回 Node.js 进程的当前工作目录。

```js
const { cwd } = require('node:process');

console.log(`Current directory: ${cwd()}`);
```