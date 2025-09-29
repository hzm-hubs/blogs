vue与vue-server-renderer版本不兼容，需要检查package.json、package-lock.json、yarn.lock文件中俩者是否有版本配置

```js
// 终端提示版本不兼容
 FATAL                                                                                                                                                  14:47:07

Vue packages version mismatch:

- vue@2.6.11
- vue-server-renderer@2.6.14

This may cause things to work incorrectly. Make sure to use the same version for both.


  
  Vue packages version mismatch:
  
  - vue@2.6.11
  - vue-server-renderer@2.6.14
  
  This may cause things to work incorrectly. Make sure to use the same version for both.
  
  at Object.<anonymous> (node_modules/vue-server-renderer/index.js:8:9)
  at Module._compile (node:internal/modules/cjs/loader:1101:14)
  at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
  at Module.load (node:internal/modules/cjs/loader:981:32)
  at Function.Module._load (node:internal/modules/cjs/loader:822:12)
  at Module.require (node:internal/modules/cjs/loader:1005:19)
  at require (node:internal/modules/cjs/helpers:102:18)
  at Object.<anonymous> (node_modules/@nuxt/vue-renderer/dist/vue-renderer.js:20:27)
  at Module._compile (node:internal/modules/cjs/loader:1101:14)
  at Object.Module._extensions..js (node:internal/modules/cjs/loader:1153:10)
  at Module.load (node:internal/modules/cjs/loader:981:32)
  at Function.Module._load (node:internal/modules/cjs/loader:822:12)
  at Module.require (node:internal/modules/cjs/loader:1005:19)
  at require (node:internal/modules/cjs/helpers:102:18)
  at node_modules/@nuxt/server/dist/server.js:603:94
  at new Promise (<anonymous>)


/Users/huangliuliu/Documents/Code/turingfocus-back/node_modules/vue-server-renderer/index.js:8
  throw new Error(
        ^
Error: 

Vue packages version mismatch:

- vue@2.6.11
- vue-server-renderer@2.6.14

This may cause things to work incorrectly. Make sure to use the same version for both.
```