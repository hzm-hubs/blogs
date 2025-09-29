1、 预构建：它们可以提高页面加载速度，并将 CommonJS / UMD 转换为 ESM 格式。预构建这一步由 esbuild 执行，这使得 Vite 的冷启动时间比任何基于 JavaScript 的打包器都要快得多。此外vite 是根据页面按需导入依赖，而webpack是整体导入所有依赖后才启动页面，所以vite感知更快，
但 vite更适用中小项目，大项目体验还得看 webpack

2、重写导入为合法的 URL：vite会在node_modules下生成.vite文件夹，里面是使用到的依赖，例如 /node_modules/.vite/deps/my-dep.js?v=f3sf2ebd 以便浏览器能够正确导入它们。

参考链接[https://juejin.cn/post/7280747221510144054]