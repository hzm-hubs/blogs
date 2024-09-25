在操作页面滚动和动画时经常会获取 DOM 元素的绝对位置， 例如 本文 左侧的悬浮导航，当页面滚动到它以前会正常地渲染到文档流中， 当页面滚动超过了它的位置，就会始终悬浮在左侧。

本文会详述各种获取 DOM 元素绝对位置 的方法以及对应的兼容性。 关于如何获取 DOM 元素高度和滚动高度，请参考 视口的宽高与滚动高度 一文。

### 概述
这些是本文涉及的 API 对应的文档和标准，供查阅：

|**API**|**用途**|**文档**|**标准**|
|--|--|--|--|
|offsetTop|相对定位容器的位置|MDN|CSSOM View Module|
|clientTop|上边框宽度|MDN|CSSOM View Module|
|.getBoundingClientRect()|元素大小和相对视口的位置|MDN|CSSOM View Module|
|.getClientRects()|所有子 CSS 盒子的大小和位置|MDN|CSSOM View Module|
|.getComputedStyle()|应用所有样式表和计算之后的 CSS 属性|MDN|DOM Level 2 StyleCSSOM|

### offsetTop/offsetLeft
HTMLElement.offsetTop 用来获取当前元素（不包括上边框） 相对于定位容器（positioning container）的位置。也就是说，
- 如果所有祖先元素都是静态定位 position:static;（这是默认的情况），offsetTop 表示与文档最上方的高度差（文档最上方可能已经滚出视口，这个高度可能大于视口高度）。
- 如果存在绝对定位的祖先元素 position:absolute/fixed，offsetTop 就会相对于这个元素。因此为了获取相对于文档最上方的高度差，需要递归地调用：
```js
function getOffsetTop(el){
    return el.offsetParent
        ? el.offsetTop + getOffsetTop(el.offsetParent)
        : el.offsetTop
}
```
`el.offsetParent` 是当前元素的定位容器（positioning container）， 如果当前元素没有绝对定位的祖先节点，这个属性的值就是 `null`。

兼容性和限制：几乎所有浏览器都支持该属性。如果元素被隐藏它的值就是 0，但在 IE9 下没有影响。

### clientTop/clientLeft
不要被名字误导，`Element.clientTop` 是指当前元素的 `上边框的宽度` 的整数值。 总是等于 `getComputedStyle()` 返回的 `border-top-width` 属性的四舍五入为整数后的值。

为什么呢？在 DOM 术语中，client 总是指除边框（border）外的渲染盒子（内边距+内容大小）。 offset 总是指包含边框的渲染盒子（边框+内边距+内容大小）， clientTop 即为这两者的 Top 之差，即边框宽度。盒子的概念请参考： CSS Display 属性与盒模型

兼容性和限制：同 offsetTop/offsetLeft

### .getBoundingClientRect()
Element.getBoundingClientRect() 用于获取元素的大小，以及相对于视口（viewport）的位置， 返回一个 DOMRect 对象。
```js
> document.querySelector('span').getBoundingClientRect()
DOMRect {x: 2.890625, y: 218.890625, width: 1264, height: 110, top: 218.890625, …}
bottom: 328.890625
height: 110
left: 2.890625
right: 1266.890625
top: 218.890625
width: 1264
x: 2.890625
y: 218.890625
```
如果要获取相对于文档左上角的位置，需要在上述 top 和 left 的基础上再加滚动位置。 如下代码来自 MDN，可兼容几乎所有浏览器：
```js
// For scrollX
(((t = document.documentElement) || (t = document.body.parentNode))
  && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
// For scrollY
(((t = document.documentElement) || (t = document.body.parentNode))
  && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
```
兼容性和限制：同样是 CSSOM View Module 的特性，但几乎兼容所有浏览器，可参考 https://caniuse.com/#feat=getboundingclientrect IE 下窗口的左上角可能不是 0,0，在 IE9 可以这样把它设置为 0,0：
```
<meta http-equiv="x-ua-compatible" content="ie=edge"/>
```
### .getClientRects()

Element.getClientRects() 用来获得 DOM 元素中的所有 CSS 盒模型 对应的 DOMRect 组成的集合。

如果是一个块级元素，返回的集合中应该只有一个元素，即这个块的大小和位置。 但如果是一个行内元素（或者 SVG 内的元素），则会返回其中每个 CSS 盒子。比如一个普通的被默认折行的 `<span>`：
```js
> document.querySelector('span').getClientRects()
DOMRectList {0: DOMRect, 1: DOMRect, 2: DOMRect, length: 5}
0: DOMRect {x: 2.890625, y: 262.890625, width: 1264, height: 22, top: 262.890625, …}
1: DOMRect {x: 2.890625, y: 284.890625, width: 1264, height: 22, top: 284.890625, …}
2: DOMRect {x: 2.890625, y: 306.890625, width: 768,  height: 22, top: 306.890625, …}
```
这个 `<span>` 有三行，其中第三行的长度不足一行，每次折行都形成了一个新的 CSS 盒子。

兼容性和限制：在 IE8 及以下会返回 IE 独有的 TextRectangle 对象（而不是 ClientRect）， 这个对象不具有 width 和 height 属性，而且无法给它设置属性。参考： https://webplatform.github.io/docs/dom/HTMLElement/getClientRects/

### .getComputedStyle()
Window.getComputedStyle() 可以得到一个元素的所有计算后的 CSS 属性。 对于简单的绝对定位元素，可以通过这个 API 返回的 top，left 等属性值获取元素的位置。 例如：
```js
let btn = document.querySelector('#btn-scroll-up')
let {top, left} = getComputedStyle(btn)
console.log('top:', top, 'left:', left)
```
`.getComputedStyle()` 还有一个有用的用法，获取伪元素的大小和位置等样式信息：
```js
// 以下代码来自： https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
var h3 = document.querySelector('h3'); 
var result = getComputedStyle(h3, ':after').content;
console.log('the generated content is: ', result); // returns ' rocks!'
```
兼容性和限制：`.getComputedStyle()` 几乎兼容所有浏览器，可参考 https://caniuse.com/#search=getComputedStyle。 但它返回的值是 CSS 属性，用它获取绝对位置时要注意值的类型。 例如 left 可能是 13px 这样的绝对值，也可能是 auto 这样的 CSS 关键字。

### 总结
- 获取 DOM 元素相对于文档的位置，可以直接使用 
offsetTop；
- 获取 DOM 元素相对于视口的位置，可以使用 
.getBoundingClientRect()；
- 获取 SVG 元素或行内元素的 CSS 盒子（比如用来做文本高亮时），可以使用 
.getClientRects()；
- 获取绝对定位元素、伪元素的渲染后 CSS 属性，可以使用 
.getComputedStyle()。

本文采用 知识共享署名 4.0 国际许可协议（CC-BY 4.0）进行许可，转载注明来源即可： https://harttle.land/2018/04/22/get-dom-layout.html。如有疏漏、谬误、侵权请通过评论或 邮件 指出。