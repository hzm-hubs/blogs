在 JavaScript 中，return 语句只能在函数内部使用，用于返回函数执行的结果，并结束函数的执行。
```js
<script type="text/javascript" charset="utf-8">
    // feature-customer 禁止浏览器直接访问
    console.log("父级", window.top);
    console.log("自己", window);
    var isIframe = true
    const selfUrl = window.location.href
    const topUrl = window.top ? window.top.location.href : '';
    const parentUrl = window.parent ? window.parent.location.href : '';
    // feature 判断是否嵌入使用
    if (selfUrl == topUrl || parentUrl == selfUrl) {
        isIframe = false
       return 
    } 
    ………………
}
```
浏览器日志栏会提示：
```js
Uncaught SyntaxError: Illegal return statement
以下是一些常见导致 "Illegal return statement" 错误的情况：
1.在全局范围内使用 return
：return 语句只能在函数内部使用，如果在全局范围（即非函数内部）使用 return，则会导致错误。
// 错误示例
return 42;
```
2.在条件语句中使用 return
：在条件语句（如 if、else、switch）中使用 return 时，需要确保 return 不会提前退出函数。
```js
// 错误示例
function exampleFunction() {
    if (true) {
        return 1;
    }
}
```
3.在循环中使用 return
：在循环语句（如 for、while）中使用 return 时，需要注意 return 的位置，避免导致提前退出循环。
```js
// 错误示例
function exampleFunction() {
    for (let i = 0; i < 10; i++) {
        return i;
    }
}
``` 