Umi 提供了多种灵活的方式来配置 Webpack，以下是主要的配置方法：

1. 通过 .umirc.ts 或 config/config.ts 配置
这是最常用的方式，Umi 内置了 webpack 配置的抽象：

```typescript
// .umirc.ts 或 config/config.ts
export default {
  // 修改 webpack 配置
  chainWebpack(memo, { env, webpack }) {
    // memo 是 webpack-chain 对象
    memo.plugin('define').tap(args => {
      args[0].process.env.VERSION = JSON.stringify('1.0.0');
      return args;
    });
  },
  
  // 或者使用更底层的 configureWebpack
  configureWebpack: {
    // 与 webpack 配置完全一致
    plugins: [
      new MyWebpackPlugin()
    ]
  }
}
```
2. 使用 webpack.config.js 扩展配置
在项目根目录创建 webpack.config.js：

```javascript
module.exports = {
  // 这里的配置会和 umi 的默认配置做 deep merge
  module: {
    rules: [
      {
        test: /\.myext$/,
        use: ['my-loader']
      }
    ]
  }
};
```
3. 使用环境变量文件配置
创建 .env 文件进行配置：

```bash
# .env
WEBPACK_BUNDLE_ANALYZER=true
```
然后在配置中使用：

```typescript
export default {
  chainWebpack(memo) {
    if (process.env.WEBPACK_BUNDLE_ANALYZER) {
      memo.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
    }
  }
}
```
4. 通过插件系统配置
创建自定义插件：

```typescript
// plugins/my-plugin.ts
import { IApi } from 'umi';

export default (api: IApi) => {
  api.chainWebpack(memo => {
    // 修改 webpack 配置
    memo.module
      .rule('my-rule')
      .test(/\.myext$/)
      .use('my-loader')
      .loader('my-loader');
    return memo;
  });
};
```
然后在配置中启用：

```typescript
export default {
  plugins: ['./plugins/my-plugin']
}
```
5. 运行时动态配置
在 src/app.ts 中配置：

```typescript
export const chainWebpack = (memo, { webpack }) => {
  // 可以在这里根据环境动态修改配置
  return memo;
};
```
常用配置示例

添加 loader
```typescript
export default {
  chainWebpack(memo) {
    memo.module
      .rule('markdown')
      .test(/\.md$/)
      .use('markdown-loader')
      .loader('markdown-loader');
  }
}
```
修改别名
```typescript
export default {
  chainWebpack(memo) {
    memo.resolve.alias.set('@components', path.resolve(__dirname, 'src/components'));
  }
}
```
添加插件
```typescript
export default {
  chainWebpack(memo) {
    memo.plugin('my-plugin').use(MyPlugin, [{ option: true }]);
  }
}
```
最佳实践建议

- 优先使用 chainWebpack：比 configureWebpack 更灵活且能访问 Umi 内部配置

- 避免直接覆盖配置：尽量使用合并而非完全覆盖

- 区分环境：通过 env 参数区分开发和生产环境

- 使用 TypeScript：获得更好的类型提示

- 合理组织配置：复杂配置可以拆分为多个插件

Umi 的 webpack 配置能力非常灵活，可以根据项目需求选择最适合的方式。对于大多数场景，使用 chainWebpack 就足够了。