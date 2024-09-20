### CSS垂直居中的12种实现方式

[参考链接](https://juejin.cn/post/6844903550909153287)

以下html内容为例
```html
<div id="box">
    <div id="child"></div>
</div>
```
初始css
```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    position: relative;
}
#child {
    width: 150px;
    height: 100px;
    background: orange;
    position: absolute;
    top: 50%;
    margin: -50px auto 0 auto; 
}
```

### 1.使用绝对定位和负外边距对块级元素进行垂直居中
绝对定位 absolute + 具体像素
```css
#child {
    ……
    top: 50%;
    margin: -50px auto 0 auto; 
}
```
这个方法兼容性不错，但是有一个小缺点：必须提前知道被居中块级元素的尺寸，否则无法准确实现垂直居中。
### 2.使用绝对定位和transform
```css
#child {
    ……
    top: 50%;
    transform: translate(0, -50%);
    // or
    transform: translateY(-50%);
}
```
这种方法有一个明显的好处就是不必提前知道被居中元素的尺寸了，因为 `transform` 中 `translateY` 偏移的百分比就是相对于元素自身的尺寸而言的。
### 3.使用绝对定位和负外边距进行垂直居中的方式
```css
#child {
    ……
    top: 50%;
    margin: -15% 0 0 0;
}
```
这种方式的原理实质上和前两种相同。补充的一点是：margin 的取值也可以是百分比，这时这个值规定了该元素基于父元素尺寸的百分比，可以根据实际的使用场景来决定是用具体的数值还是用百分比。
### 4.绝对定位结合margin: auto
```css
#child {
    ……
    top: 0;
    bottom: 0;
    margin: auto;
    line-height: 100px;
}
```
这种实现方式的两个核心是：把要垂直居中的元素相对于父元素绝对定位，top和bottom设为相等的值，我这里设成了0，当然也可以设为 99999px 或者 -99999px 无论什么，只要两者相等就行，这一步做完之后再将要居中元素的 margin 属性值设为 auto，这样便可以实现垂直居中了。

被居中元素的宽高也可以不设置，但不设置的话就必须是图片这种自身就包含尺寸的元素，否则无法实现。

### 5.使用父元素padding实现子元素的垂直居中
```css
#box {
    width: 300px;
    background: #ddd;
    padding: 100px 0;
}
#child {
    width: 200px;
    height: 100px;
    background: orange;
}
```

### 6.设置第三方占位
html:
```html
<div id="box">
    <div id="base"></div>
    <div id="child"></div>
</div>
```
```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
}
#base {
    height: 50%;
    background: orange;
}
#child {
    height: 100px;
    background: rgba(131, 224, 245, 0.6); 
    margin-top: -50px;
}
```
这种方式也非常简单，首先设置一个高度等于父元素高度一半的第三方基准元素，这时该基准元素的底边线就是父元素纵向上的中分线，做完这些之后再给要垂直居中的元素设置一个 margin-top 属性，值的大小是它自身高度的一半取负，则实现垂直居中。

### 7.flex布局
为父元素添加 flex 弹性布局
```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
}
```
 `align-items` 属性，该属性定义项目在交叉轴（这里是纵向轴）上的对齐方式，可能的取值有五个，分别如下：
- flex-start:：交叉轴的起点对齐
- flex-end：交叉轴的终点对齐
- center：交叉轴的中点对齐
- baseline：项目第一行文字的基线对齐
- stretch（该值是默认值）：如果项目没有设置高度或者设为了auto，那么将占满整个容器的高度

`justify-content` 属性定义了项目在主轴上的对齐方式，可能的取值有五个

- flex-start（该值是默认值）：左对齐
- flex-end：右对齐
- center：居中对齐
- space-between：两端对齐，各个项目之间的间隔均相等
- space-around：各个项目两侧的间隔相等
  
### 8.line-height 对单行文本进行垂直居中
```html
<div id="box">test vertical align</div>
```
```css
#box{
    width: 300px;
    height: 300px;
    background: #ddd;
    line-height: 300px;
}
```
要注意的是，line-height (行高) 的值不能设为 100%，我们来看看官方文档中给出的关于 line-height 取值为百分比时候的描述：“基于当前字体尺寸的百分比行间距”。也就是说，这里的百分比并不是相对于容器元素尺寸而言的，而是相对于字体尺寸。 其次如果元素设置了padding属性，height属性值应该等于line-height + 上、下内边距之和

### 9.line-height 和 vertical-align 对图片进行垂直居中
```html
<div id="box">
    <img src="smallpotato.jpg">
</div>
```
```css
#box{
    width: 300px;
    height: 300px;
    background: #ddd;
    line-height: 300px;
}
#box img {
    width: 200px;
    height: 200px;
    vertical-align: middle;
}
```
[vertical-align 属性介绍](https://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/)

### 10.使用 display: table; 和 vertical-align: middle; 对容器里的文字进行垂直居中
```
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    display: table;
}
#child {
    display: table-cell;
    vertical-align: middle;
}
```
父元素设置table布局，子元素设置table-cell布局，vertical-align 。vertical-align属性只对拥有 valign 特性的 html 元素起作用，例如表格元素中的 <td> <th> 等等，而像 <div> <span> 这样的元素是不行的。

valign 属性规定单元格中内容的垂直排列方式，语法：`<td valign="value">`，value的可能取值有以下四种：
- top：对内容进行上对齐
- middle：对内容进行居中对齐
- bottom：对内容进行下对齐
- baseline：基线对齐

### 11.使用 grid 布局
```
<div id="box">
    <div class="one"></div>
    <div class="two">target item</div>
    <div class="three"></div>
</div>
```
```css
#box {
    width: 300px;
    height: 300px;
    display: grid;
}
.two {
    background: orange;
}
.one, .three {
    background: skyblue;
}
```
这种场景下使用 Grid Layout 非常方便，只需要设置 .one .three 两个辅助元素即可，只是 Grid 布局现在浏览器支持度还比较低。

### 12. CSS Grid 设置水平居中
```html
<div id="box">
    <div></div>
    <div class="two">target item</div>
    <div></div>
</div>
```
```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}
.two {
    background: orange;
}
```
同样的添加两个辅助元素，然后将 grid-template-columns 属性值设置为 1fr 1fr 1fr，意为三列子元素等分全部可用宽度。
也可以设置为已知宽度
```css
#box {
    width: 300px;
    height: 300px;
    background: #ddd;
    display: grid;
    grid-template-columns: 1fr 211px 1fr;
}
```
