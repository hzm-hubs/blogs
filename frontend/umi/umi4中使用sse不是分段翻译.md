在做chat的网页聊天应用，需要使用HTTP的SSE特性实现文本流式输出的功能。但是在使用umijs提供的代理功能对服务端的sse接口进行代理之后，接口会被阻塞，直到所有的event的都处理结束，才一次性返回到页面端。尝试过fetch、fetchsource 和原生 XMLHttpRequest 都是搜集完后再全部返回前台



参考：https://github.com/umijs/umi/issues/12144

umi官方也有解释（https://umijs.org/docs/guides/env-variables）

默认 Umi 开发服务器自带 compress 压缩中间件，这会使开发时 SSE 数据的传输 无法流式获取 ，通过指定 UMI_DEV_SERVER_COMPRESS=none 来关闭 compress 压缩功能：