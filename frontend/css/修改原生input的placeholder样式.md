`::placeholder` 和 `:placeholder-shown` 是两个不同的 CSS 伪类/伪元素，它们用于样式化和选择带有占位符的输入框，但它们的作用和使用场景有所不同。

1. ::placeholder

类型: 伪元素

作用: 用于设置输入框占位符（placeholder）的样式。

作用范围: 仅影响 placeholder 文本本身的样式，不影响输入框的内容或其他部分。

示例代码：
```html
<input type="text" placeholder="Enter your name" />`

// css
input::placeholder {
    color: gray;
    font-style: italic;
    font-size: 14px;
}
```
特点：
- 只能作用于 placeholder 文本。
- 可设置样式属性如 color、font-size、font-style 等。
- 如果输入框内容改变，::placeholder 不会被应用，因为占位符会被隐藏。

2. :placeholder-shown

类型: 伪类

作用: 用于选择当前显示占位符的输入框。

作用范围: 选择当前显示占位符的输入框，适用于整个输入框，而不仅仅是占位符文本。

示例代码：
```html
<input type="text" placeholder="Enter your name" />
// css
input:placeholder-shown {
    border-color: lightgray;
    background-color: #f9f9f9;
}
```
特点：
- 选择的是显示占位符的整个输入框，而不是占位符文本。
- 当输入框有内容时，占位符隐藏，伪类 :placeholder-shown 将不再匹配。
- 适用于需要根据占位符的显示状态修改输入框的其他样式。

主要区别
|**特性**|**::placeholder**|**:placeholder-shown**|
|--|--|--|
|类型|伪元素|伪类|
|作用范围|仅影响 placeholder 文本的样式|选择显示 placeholder 的整个输入框|
|状态变化|输入框内容不影响|输入框有内容时，伪类失效|
|常用场景|自定义占位符的颜色、字体等样式|根据占位符的显示状态调整输入框样式|

组合使用示例
以下示例展示了如何同时使用 ::placeholder 和 :placeholder-shown 来分别设置占位符文本和输入框的样式。

```html
<input type="text" placeholder="Enter your name" />
// css
/* 占位符的样式 */
input::placeholder {
    color: gray;
    font-size: 14px;
    font-style: italic;
}

/* 输入框在显示占位符时的样式 */
input:placeholder-shown {
    border-color: lightgray;
    background-color: #f9f9f9;
}

/* 输入框有内容时的样式 */
input:not(:placeholder-shown) {
    border-color: blue;
    background-color: white;
}
```
当输入框显示占位符时，背景为灰色，边框为浅灰色。

输入框有内容时，背景变白，边框变蓝。

浏览器支持

::placeholder: 支持现代主流浏览器，但需要注意旧版浏览器的前缀写法（如 ::-webkit-input-placeholder）。

:placeholder-shown: 支持较新的浏览器（如 Chrome 61+、Firefox 19+、Edge 15+），无需前缀。

如果需要兼容旧浏览器，建议使用前缀：

```css
/* 兼容性占位符样式 */
input::-webkit-input-placeholder {
    color: gray;
}
input::-moz-placeholder {
    color: gray;
}
input:-ms-input-placeholder {
    color: gray;
}
input::-ms-input-placeholder {
    color: gray;
}
```

总结

::placeholder: 专注于占位符文本的样式。

:placeholder-shown: 用于判断输入框是否显示占位符，从而调整整个输入框的样式。