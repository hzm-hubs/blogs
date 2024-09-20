```js
// 创建 style 标签
const style = document.createElement('style');

// 定义类名样式
const cssCode = `
  .myClass {
    color: red;
    font-size: 16px;
  }
`;

// 将样式代码添加到 style 标签中
style.innerHTML = cssCode;

// 将 style 标签添加到文档的头部部分
document.head.appendChild(style);
```
在上述示例中，我们首先使用 createElement 方法创建一个 style 标签。然后，定义了一个包含类名样式的 CSS 代码字符串，并将其赋值给 style.innerHTML。最后，通过 appendChild 方法将 style 标签添加到文档的头部部分（<head> 元素）。
这样就可以动态创建并添加类名样式到文档中。请确保在需要的时候执行这段代码，比如在页面加载完成后或其他特定的事件触发时。
计算每个表格自身的th，td的最小宽度并生效
```js
    // 表格是 vuepress 插件撰写的 所以 通过 vuepress-markdown-body 拿的 
    function handleTable() {
        const tables = Array.from(document.getElementsByTagName('table'));
        if (!tables?.length) {
            return;
        }
        // vuepress-markdown-body css 控制最小的宽度是 350 左右
        const tableWidthForFather = document?.getElementsByClassName('vuepress-markdown-body')?.[0]?.children?.[0].clientWidth || 350;
        for (const i in Array.from(tables)) {
            // 目前最大的表格列数 td 是 7
            const totalTd = tables[i].getElementsByTagName('tbody')?.[0].children?.[0]?.children?.length || 7;
            // 除以 totalTd + 1，是考虑（表格边框……等的影响）所以多除一个
            const minWidth = `${Math.floor(tableWidthForFather / (totalTd + 1))}px`;
            const className = `vpmd-table-${i}`;
            const styleEle = document.createElement('style');
            styleEle.innerHTML = `.${className} td, .${className} th {
                    min-width: ${minWidth}
                }`;
            document.body.appendChild(styleEle);
            tables[i].classList.add(className);
        }
    }
```