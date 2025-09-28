在 Node.js 的 Web 开发中，路由（Route） 是框架中核心的组成部分，它负责将不同的 HTTP 请求（如 GET、POST 等）映射到相应的处理函数，并最终向客户端返回数据。无论是使用 Express 还是 Koa，处理路由并返回数据的方法都非常灵活。

下面是一个对比表格，汇总了 Express 和 Koa 路由返回数据的主要方法：

|**功能特点**|**Express**|**Koa**|
|--|--|--|
|基本响应|	res.send(), res.json(), res.end()|	ctx.body =|
|设置状态码	|res.status(code)	|ctx.status = code|
|设置响应头	|res.set('Header-Name', 'value')|	ctx.set('Header-Name', 'value')|
|返回 JSON|	res.json(obj)|	ctx.body = obj (自动设置 Content-Type 为 application/json)|
|返回字符串/文本	|res.send('text')|	ctx.body = 'text'|
|返回 HTML|	res.send(htmlString) 或 res.render(template)|	ctx.body = htmlString 或 ctx.render(template) (需模板引擎)|
|文件下载|res.download(filePath)	|需设置 Content-Disposition 等响应头，或使用 koa-send|
|重定向	|res.redirect([status,] path)|	ctx.redirect(path)|
|流式传输 (Streaming)	|res.write(chunk), res.end() 或 pipe()|	ctx.body = stream (Koa 原生支持将 body 设置为流)|
|统一响应格式 (中间件示例)	|自定义中间件扩展 res 对象 (如 res.success())|	自定义中间件扩展 ctx 对象 (如 ctx.success())

🧩 Express 通过 res（响应）对象上的一系列方法（如 res.send(), res.json()）来返回数据。

🧩 Koa 则主要通过设置上下文对象 ctx 的 body 属性（即 ctx.body = ...）来返回响应体。

在实际项目中，统一的响应格式（如 { code, data, msg }）非常有助于前端处理。这通常通过自定义中间件实现。

在 Koa 中，你可以这样创建一个中间件来扩展 ctx 对象：

```javascript
// middleware/routerResponse.js
function routerResponse(option = {}) {
  return function (ctx, next) {
    ctx.success = function (data) {
      ctx.type = option.type || 'json';
      ctx.body = {
        code: option.successCode || 200,
        msg: option.successMsg || 'success',
        data: data
      };
    };

    ctx.fail = function (msg, code) {
      ctx.type = option.type || 'json';
      ctx.body = {
        code: code || option.failCode || 99,
        msg: msg || option.successMsg || 'fail',
      };
    };
    next();
  };
}
module.exports = routerResponse;

// 在 app.js 中使用
const Koa = require('koa');
const app = new Koa();
let routerResponse = require('./middleware/routerResponse');
app.use(routerResponse()); // 使用中间件

// 在路由中使用
router.get('/data', (ctx) => {
  ctx.success({ items: [] }); // 使用扩展的方法
});
```
在 Express 中，概念类似，不过是扩展 res 对象：

```javascript
// 自定义中间件扩展 res 对象
function responseFormat(req, res, next) {
  res.success = function (data) {
    res.json({
      code: 200,
      msg: 'success',
      data: data
    });
  };

  res.fail = function (msg, code = 500) {
    res.status(code).json({
      code: code,
      msg: msg
    });
  };
  next();
}

// 在 app.js 中使用
const express = require('express');
const app = express();
app.use(responseFormat); // 使用中间件

// 在路由中使用
app.get('/data', (req, res) => {
  res.success({ items: [] }); // 使用扩展的方法
});
```