换新 mbp 后，安装了最新的 node 版本，yarn 安装依赖后运行项目提示：
```
Module build failed (from ./node_modules/babel-loader/lib/index.js):                                                 friendly-errors 10:23:17
Error: /Users/huangliuliu/Documents/Code/turingfocus-pc/.nuxt/client.js: Cannot find module '@babel/preset-env/lib/utils'
Require stack:
- /Users/huangliuliu/Documents/Code/turingfocus-pc/node_modules/@nuxt/babel-preset-app/src/polyfills-plugin.js
- /Users/huangliuliu/Documents/Code/turingfocus-pc/node_modules/@nuxt/babel-preset-app/src/index.js
- /Users/huangliuliu/Documents/Code/turingfocus-pc/node_modules/@babel/core/lib/config/files/module-types.js
- /Users/huangliuliu/Documents/Code/turingfocus-pc/node_modules/@babel/core/lib/config/files/configuration.js
- /Users/huangliuliu/Documents/Code/turingfocus-pc/node_modules/@babel/core/lib/config/files/index.js
……………………
……………………
……………………
```
查阅文章，发现新版的babel配置所有变化，以下是安装配置
```
npm install babel-loader babel-core babel-preset-env -D

npm i @babel/plugin-transform-runtime -D

npm i @babel/runtime -D

npm i @babel/core@^7.0.0 -D

npm i @babel/preset-env -D

npm i @babel/plugin-proposal-class-properties -D

npm i babel-loader @babel/core @babel/runtime @babel/preset-env @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime -D
```
将以上的安装依赖生成到生产项中
```
"devDependencies": {
    "@babel/core": "^7.4.5",
    "@babel/plugin-proposal-class-properties": "^7.4.4",
    "@babel/plugin-transform-runtime": "^7.4.4",
    "@babel/preset-env": "^7.4.5",
    "@babel/runtime": "^7.4.5",
    "babel-loader": "^8.0.6"
}
```
此外，还要配置 .babelrc 文件 或者 在 项目的启动文件中配置
```
如 nuxt.config.ts:
    ………………………………
    build:{
        …………,
        babel:{
        
	 	 "presets": ["@babel/preset-env"],
		 "plugins": ["@babel/plugin-transform-runtime","@babel/plugin-proposal-class-properties"]

        
        }    
    }
```
尝试重新启动运行项目
