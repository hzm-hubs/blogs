webpack 有的版本需要指定 NODE_ENV 或者是其他的环境变量

+ 1.在启动命令处配置
```json
{
    "scripts": {
		"dev": "dotenv -e .env.dev craco start",
		"webpack-self": "NODE_ENV=development webpack",
	},
}
```
+ 2.在web.config.js中配置plugin
```js
const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
}
```