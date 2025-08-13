运行旧项目提示：

```
Starting the development server...

node:internal/crypto/hash:69
  this[kHandle] = new _Hash(algorithm, xofLen);
                  ^

Error: error:0308010C:digital envelope routines::unsupported
    at new Hash (node:internal/crypto/hash:69:19)
    at Object.createHash (node:crypto:133:10)
    at module.exports (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/webpack/lib/util/createHash.js:135:53)
    at NormalModule._initBuildHash (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/webpack/lib/NormalModule.js:417:16)
    at handleParseError (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/webpack/lib/NormalModule.js:471:10)
    at /Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/webpack/lib/NormalModule.js:503:5
    at /Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/webpack/lib/NormalModule.js:358:12
    at /Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/loader-runner/lib/LoaderRunner.js:373:3
    at iterateNormalLoaders (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/loader-runner/lib/LoaderRunner.js:214:10)
    at Array.<anonymous> (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/loader-runner/lib/LoaderRunner.js:205:4)
    at Storage.finished (/Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:55:16)
    at /Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:91:9
    at /Users/huangliuliu/Documents/Code/Bonc/smartim/node_modules/graceful-fs/graceful-fs.js:123:16
    at FSReqCallback.readFileAfterClose [as oncomplete] (node:internal/fs/read_file_context:68:3) {
  opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
  library: 'digital envelope routines',
  reason: 'unsupported',
  code: 'ERR_OSSL_EVP_UNSUPPORTED'
}

Node.js v18.19.1

 *  终端进程“/bin/zsh '-l', '-c', 'npm run start'”已终止，退出代码: 1。 
 *  终端将被任务重用，按任意键关闭。 
```

关键信息可判断为 Node 版本不兼容

- 错误码/错误信息
  - ERR_OSSL_EVP_UNSUPPORTED
  - error:0308010C:digital envelope routines::unsupported
  
这些是 Node 17+（OpenSSL 3）与旧版构建工具常见的不兼容错误。
- 调用栈指向 webpack 4 的哈希实现
  - /node_modules/webpack/lib/util/createHash.js
  - NormalModule._initBuildHash

说明是 webpack 4 的哈希实现在 Node 17+ 环境下触发的已知问题。
- 当前 Node 版本
  - Node.js v18.19.1
明确表明正在使用 Node 18（>=17）。

- 项目中的构建工具版本
  - package.json 中 webpack: "^4.0.0"
  - umi: "^2.2.1"（Umi 2 基于 webpack 4）

结合 Node 18，可判断为典型的不兼容组合。

可选修复思路（择一）：
- 降级到 Node 16 LTS；

- 临时设置 NODE_OPTIONS=--openssl-legacy-provider；或升级到支持 Node 18 的构建栈（webpack 5 / Umi 3+）。