### 一体化，开箱即用

umi4中集成了antd、request、useModel(基于react17中hooks的useReducer封装)、react-dom等插件，不用再像umi2那样手动安装 dva、ui、ajax 等依赖

### 支持动态路由和前套路由，以及懒加载模式

### 构建更快

新版umi启用了 msfu3.0 （会在node_modules下.cache文件夹下生成预编译包）特性。在开发阶段只编译业务代码，node_modules 不编译而是存储到磁盘中，等需要使用时从缓存中读取。其次按需导入/更新变更模块及其相关依赖，此外还进行共享依赖避免重复打包 （更好的 tree-shaking）。还有就是对Chunk进行了抽离优化

### 总结

速度提升关键因素：

MFSU 3.0：避免重复编译 node_modules（70% 的速度提升）

ESBuild：极速的代码转换和压缩（10-100x 速度提升）

智能缓存：多层缓存策略减少重复工作（50% 的时间节省）

并行处理：充分利用多核 CPU（30-50% 的效率提升）

按需编译：只编译需要的代码（60% 的构建量减少）

内存优化关键因素：

增量更新：只更新变化的模块

缓存复用：避免重复的内存分配

资源释放：及时清理不再需要的缓存

内存限制：防止内存泄漏和溢出

### 配置建议

```js
// 推荐的中大型项目配置
export default {
  mfsu: {
    strategy: 'normal',
    exclude: ['moment', 'lodash'],
    // 共享依赖
    shared: {
      react: { singleton: true, eager: true },
      'react-dom': { singleton: true, eager: true },
    },
  },
  
  // 代码压缩
  jsMinifier: 'esbuild',
  cssMinifier: 'esbuild',
  
  dynamicImport: {
    loading: '@/components/PageLoading',
    level: 1,
  },
  
  // 抽离
  chunks: ['vendors', 'umi', 'commons', 'pages'],
  
  // 缓存
  cache: {
    buildDependencies: {
      config: ['./config/config.ts'],
    },
    persistentCache: true,
  },
};
```
