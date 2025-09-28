Node.js 原生HTTP模块返回如下

官方教程地址：https://nodejs.org/docs/latest/api/http.html

|**功能**|**Node.js 原生**|	
|--|--|
|设置状态码|	res.statusCode = 200	|
|设置响应头|	res.setHeader('Content-Type', 'text/plain')	|
|发送文本|	res.write('Hello') + res.end()	res.send('Hello')	|
|发送JSON|	需要手动序列化 + 设置头信息	res.json({data: 'test'})	|
|发送文件	|需要复杂的手动流处理	res.sendFile('/path/to/file')	|
|重定向|	需要手动设置状态码和Location头	res.redirect('/new-path')	|
|结束响应	|res.end()|

实例如
```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.write('Hello World');
  res.end();
});

server.listen(3000);
```