在 CSS 代码中书写 rem，它是如何被识别和转化的，主要依赖于 HTML 根元素（<html>）的 font-size 计算方式。

### rem 本质

rem（root em）表示相对于 html 元素的 font-size 计算。
 1rem = <html> 的 font-size

默认情况下，浏览器的 默认 font-size 是 16px，所以：

```css
body {
  font-size: 1rem; /* 默认 = 16px */
}
```
但如果 html 的 font-size 被修改，比如：

```css
html {
  font-size: 20px;
}
p {
  font-size: 2rem; /* 2 * 20px = 40px */
}
```
那么 p 的 font-size 就会变成 40px。

### JS 动态修改 html 的 font-size

（1）适配不同屏幕的 rem 计算
在很多移动端项目（H5 页面、React、Vue 等），开发者通常会 动态计算 html 的 font-size，然后 rem 通过这个值转换成 px

```
function setRem() {
  var docWidth = 750; // 设计稿宽度
  var clientWidth = document.documentElement.clientWidth; // 获取屏幕宽度
  var fontSize = (clientWidth / docWidth) * 100; // 计算 font-size
  document.documentElement.style.fontSize = fontSize + 'px';
}

// 页面加载和窗口变化时，重新计算
window.addEventListener('resize', setRem);
window.addEventListener('DOMContentLoaded', setRem);
```

解析

docWidth = 750px：假设设计稿宽度是 750px。

clientWidth：获取当前 屏幕宽度（比如 375px）。

html 的 font-size 计算：

```js
fontSize = (clientWidth / docWidth) * 100;
```

在 375px 宽度的手机上：
```js
375 / 750 * 100 = 50px
1rem = 50px。
```

在 414px 宽度的手机上：
```js
414 / 750 * 100 = 55.2px
1rem = 55.2px。
```

在 320px 宽度的手机上：
```js
320 / 750 * 100 = 42.7px
1rem = 42.7px。
```

### CSS 中 rem 如何被转化

1.读取 <html> 元素的 font-size（上面 JS 代码计算出来的值）。

2.计算 rem 对应的 px：
```css
div {
  width: 2rem; /* 2 * (html 的 font-size) px */
}
```


### rem 与 vw 对比
|**方案**|**原理**|**优点**|**缺点**|
|--|--|--|--|
|rem适配|通过 html 的 font-size 控制 rem 计算|兼容性好，支持老版本浏览器，灵活调整	需要|JS 监听窗口变化
|vw 适配|直接用 vw 作为单位（1vw = 1% 视口宽度）|无需 JS 计算，写 CSS 直接适配|iOS 上 100vw 可能有问题，旧版浏览器不支持