访问 smartim 项目（umi , 使用node v16）提示：
```
 ERROR  Failed to compile with 1 errors                                                                                                                   下午4:09:48

 error  in ./node_modules/react-draggable/build/cjs/Draggable.js

Module parse failed: Unexpected token (210:22)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|   // the underlying DOM node ourselves. See the README for more information.
|   findDOMNode() /*: ?HTMLElement*/{
>     return this.props?.nodeRef?.current ?? _reactDom.default.findDOMNode(this);
|   }
|   render() /*: ReactElement<any>*/{

 @ ./node_modules/react-draggable/build/cjs/cjs.js 6:4-26
 @ ./node_modules/react-resizable/build/Resizable.js
 @ ./node_modules/react-resizable/index.js
 @ ./src/pages/Knowledgebase/KnowledgeGallery/customerService.js
 @ ./src/pages/.umi/router.js
 @ ./src/pages/.umi/umi.js
 @ multi ./node_modules/af-webpack/lib/webpackHotDevClient.js ./src/pages/.umi/umi.js
```

发现是项目依赖 react-resizable 中引入的 react-draggable 中

```
  findDOMNode() /*: ?HTMLElement*/{
    return this.props?.nodeRef?.current ?? _reactDom.default.findDOMNode(this);
  }
```
写法在 react 16.14+ 中解析失败，在具体页面中注释 react-resizable ，项目可以成功启动

解决方法：

1、使用 react-rnd 插件替换 react-resizable 依赖

2、添加插件, 通过@babel转译

// package.json
``` js
  "devDependencies": {
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.18.6",
    "@babel/plugin-proposal-optional-chaining": "^7.21.0",
  }
```
在 umi 配置文件中声明使用
```
  // 配置需要的 Babel 插件
  extraBabelPlugins: [
    ['@babel/plugin-proposal-optional-chaining', { loose: false }],
    ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
  ],
  // 配置额外需要做 Babel 编译的 NPM 包或目录
  extraBabelIncludes: [
    /node_modules[\\/]react-draggable[\\/]/,
  ],
```