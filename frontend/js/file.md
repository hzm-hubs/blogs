文件 [File](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 接口提供有关文件的信息，并允许网页中的 JavaScript 访问其内容。

通常情况下， File 对象是来自用户在一个 `<input>` 元素上选择文件后返回的 `FileList` 对象，也可以是来自由拖放操作生成的 `DataTransfer` 对象，或者来自 `HTMLCanvasElement` 上的 `mozGetAsFile() API`。在 Gecko 中，特权代码可以创建代表任何本地文件的 File 对象，而无需用户交互（有关详细信息，请参阅注意事项。
File 对象是特殊类型的 `Blob`，且可以用在任意的 Blob 类型的 context 中。比如说， `FileReader`, `URL.createObjectURL()`, `createImageBitmap()` , 及 `XMLHttpRequest.send()` 都能处理 Blob 和 File。
```js
var file = new File(["foo"], "foo.txt", {
  type: "text/plain",
});
```