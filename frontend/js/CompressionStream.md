CompressionStream 接口是一个用于压缩数据流的 API。

[MDN链接](https://developer.mozilla.org/zh-CN/docs/Web/API/CompressionStream/CompressionStream)

以下允许的压缩格式之一：
- "gzip"
- "deflate"
- "deflate-raw"
 
语法：`new CompressionStream(format)`

使用 gzip 压缩
```js
// ReadableStream 接口的 pipeThrough() 方法提供了一种链式的方式，
// 将当前流通过转换流或者其他任何一对可写/可读的流进行管道传输。 
const compressedReadableStream = inputReadableStream.pipeThrough(
  new CompressionStream("gzip"),
);
```
相反的 [DecompressionStream](https://developer.mozilla.org/zh-CN/docs/Web/API/DecompressionStream) 用于解压缩流
```js
const ds = new DecompressionStream("gzip");
const decompressedStream = blob.stream().pipeThrough(ds);
```