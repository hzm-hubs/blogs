### ResizeObserver

ResizeObserver 接口监视 Element 内容盒或边框盒或者 SVGElement 边界尺寸的变化。

避免了通过回调函数调整大小时，通常创建的无限回调循环和循环依赖项。它只能通过在后续的帧中处理 DOM 中更深层次的元素来做到这一点。如果它的实现遵循规范，则应在绘制前和布局后调用 resize 事件。

```js
const divElem = document.querySelector("body > div");
divElem.style.width = "600px";
const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    ……
  }
  console.log("Size changed");
});

resizeObserver.observe(divElem);
```