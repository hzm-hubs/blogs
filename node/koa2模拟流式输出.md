在koa官方文档有说明不建议直接调用 `response.write` 
```
Bypassing Koa's response handling is not supported. Avoid using the following node properties:
- res.statusCode
- res.writeHead()
- res.write()
- res.end()
```
但要实现分片向客户端发送数据，必然还是得调用 Node.js `Http` 模块的 response.write(chunk[, encoding][, callback]) 方法，而这里的 response 就是 ctx.res 或 ctx.response。

所以为什么 Koa 要说不建议直接调用上述方法操作请求的返回呢，我们来看看 Koa 内部对 response 都会做些什么默认的处理。

所以为什么 Koa 要说不建议直接调用上述方法操作请求的返回呢，我们来看看 Koa 内部对 response 都会做些什么默认的处理。

```js 
  // application.js
  handleRequest(ctx, fnMiddleware) {
    const res = ctx.res;
    res.statusCode = 404;
    const onerror = err => ctx.onerror(err);
    const handleResponse = () => respond(ctx);
    onFinished(res, onerror);
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);
  }
```
在应用完各种中间件后（fnMiddleware(ctx)）通过 handleResponse 对请求进行一些操作，最终是在 respond 函数里。

response 方法
在response里会根据外部是否有设置过 ctx.body，以及不同的 header 来设置 ctx.body，最终会调用 response.end 来结束掉本次请求。

注意到如果设置了 ctx.respond = false，这个方法就直接 return 了，这是一种跳过这里处理的方式。但其实如果我们在中间件中手动调用了 ctx.res.end() 后，相当于已经提前结束掉请求了，同样也不会走 Koa 这里的处理。

所以直接在中间件中调用 ctx.res.write() 及 ctx.res.end() 就可以实现 chunked 类型的响应，倒无须对 Koa 做额外设置。

如：koa中实现sse输出：
```js
router.get("/eventsource/back", (ctx, next) => {
    ctx.status = 200; // 绕过koa的body语法，使用node原生http必须设置status
    // 设置响应头，确保是 SSE 格式
    ctx.set("Content-Type", "text/event-stream");
    ctx.set("Cache-Control", "no-cache");
    ctx.set("Connection", "keep-alive");
    // 使用原生响应流
    const res = ctx.res;
    let str = "豫章故郡，洪都新府。";
    // 模拟流式推送数据, 不使用Promise会断流
    return new Promise((resolve) => {
        let i = 0,
            total = 10;
        while (i <= total) {
            (function (i) {
                setTimeout(() => {
                    if (i === total) {
                        resolve();
                        res.end();
                    } else {
                        res.write(`data:${JSON.stringify({ content: str[i] })}\n\n`); // \n\n必须的
                    }
                }, i * 1000);
            })(i);
            i++;
        }
    });
});
```

// 客户端模拟接入
```js
const simulateOutput2 = async (question: string) => {
    // 注意使用项目代理可能会因为其框架配置导致数据全量返回 如 umi4
    const response = await fetch('/localServer/api/eventsource', {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream',
        'content-type': 'application/json',
        'blade-auth': `${getCookie('tokenType')} ${getCookie('accessToken')}`,
      },
      // body: JSON.stringify({
      //   botId: props.botId,
      //   question,
      // }),
    });
    if (!response.body) {
      throw new Error('ReadableStream not supported in this browser');
    }
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      console.log('buffer', buffer);
      // 处理完整的消息
      let boundary;
      let index = 0;
      while ((boundary = buffer.indexOf('\n\n')) !== -1) {
        const chunk = buffer.slice(0, boundary); // 截取一条完整的没有\n\n消息
        buffer = buffer.slice(boundary + 2); // 剩下的内容
        let tempData: any = '';
        // console.log('tempData', tempData, typeof tempData);
        if (chunk.trim()?.startsWith('data:')) {
          tempData = strJson(chunk.trim().split('data:')[1]);
        } else {
          tempData = strJson(chunk.trim());
        }
        if (tempData) {
          setTimeout(() => {
            setCurResponse(tempData?.content || '');
          }, index * 50);
        }
        index++;
      }
    }
};

// 使用副作用，更新到页面
useEffect(() => {
    console.log('curResponse 变化', curResponse);
    setMessage((prevMessage) => {
      const updatedMessages = [...prevMessage];
      updatedMessages[updatedMessages.length - 1] = {
        ...updatedMessages[updatedMessages.length - 1],
        content:
          updatedMessages[updatedMessages.length - 1].content + curResponse,
        status: curResponse ? 'incomplete' : 'complete',
      };
      return updatedMessages;
    });
}, [curResponse])
```

参考链接：https://www.cnblogs.com/Wayou/p/koa_transfer_encoding_chunked.html