```js
var length = 10;

function fn() { 
    console.log('主体1',this);
    alert(this.length); 
}
var obj = {
    length: 5,
    callApi: function(fn) {
        fn();
        console.log('主体2',this);
        arguments[0]();
    }
}

obj.callApi(fn, 3)

// 主体1 Window {0: global, window: Window, self: Window, document: document, name: '', location: Location, …}
// 主体2 { length: 5, callApi: ƒ }
// 主体1 Arguments(2) [ƒ, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ ]
```
fn()方法下的this指向全局，所以fn()下的this.length指向最开始定义的10，在obj中调用时没有修改传参或者修改this指向所以还是打印10；理解 arguments[0]() 需要先理解这里的 arguments是指传入参数组['fn',3],arguments[0]()即还是运行的fn()参数，但是通过arguments[0]()的方法this发生变化指向参数组，这里传入的参数长度是2所以打印2