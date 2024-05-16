## dotenv

官网：https://www.dotenv.org/docs/quickstart

### 加载方法

* react、vue项目会自动加载根目录下的 .env 文件。
* 如果是开发模式启动额外会自动加载 .env.development 文件。
* 根据启动脚本载入相应文件：
  
  + ps1: vue-cli项目可以指定 `mode`，如 `--mode test` , 本地启动时会自动查询并载入 .env.test 文件；如果是 `npm run build` 也会载入 .env.production 文件。

  + ps2: CRA 项目可以通过dotenv ` "dev:test": "dotenv -e .env.test react-scripts start " ` 指定要载入文件

### 使用

* Vue项目
  
  以`VUE_APP_[defineName]`开头，注入项目进程中，vue页面中可通过 `process.env.VUE_APP_VERSION` 访问。

  index.html中使用:

```javascript
<meta name="verison" content="<%= VUE_APP_VERSION %>"></meta>
<link rel="icon" href="<%= BASE_URL %>favicon.ico" />
<title><%= htmlWebpackPlugin.options.title %></title>
```

注意vue2项目中,vue文件template部分不能直接访问 `process` 信息，可在该页面声明this变量承接该值:

```javascript
<script>
  const processInfo = process.env
  export default {
    name: 'UserAvatar',
    data() {
      return {
        processInfo: ''
      }
    },
    mounted() {
      this.processInfo = processInfo
    },
  }
</script>

<template>
    <div>{{processInfo.VUE_APP_VERSION}}</div>
</template>
```

* VITE项目
  
  vite 项目中已经集成，以`VITE_APP__[defineName]` 为模版

  通过配置 package.json文件的启动脚本中的 mode 可实现按需加载本地.env.*启动

  ```json
  "scripts": {
    "serve": "cross-env vite --host 0.0.0.0 --mode developmentlocal",
    "serve:test": "cross-env vite --host 0.0.0.0 --mode testlocal",
    "serve:prod": "cross-env vite --host 0.0.0.0 --mode productionlocal",
  }
  ```
  npm run serve 会加载额外加载文件 .env.developmentlocal 

  npm run serve:test 会加载额外加载文件 .env.testlocal

  npm run serve:prod 会加载额外加载文件 .env.productionlocal

  也可以再 模版 index.html 文件中使用

  在index.html中使用占位写法会被 env 文件中的变量替换

  ```html
  # head, js 中替换 可省略 VITE_APP
  <title><%= title %><title>
  
  # 标签中替换 中替换
  <h1>Vite is running in %MODE%</h1>
  <p>Using data from %VITE_API_URL%</p>
  ```

* React项目
  
  以`REACT_APP__[defineName]`开头，注入项目进程中process.env

  模版 `index.html` 中使用:

  ```javascript
  <title>%REACT_APP_NAME%</title>
  ```

  `react18`后页面可直接使用

  ```javascript
  <h2 className="app__row_title">{process.env.REACT_APP_NAME}</h2>
  ```