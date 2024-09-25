### const,let,var声明
所有通过 var 定义的变量和函数都会成为 window 对象的属性和方法。使用 let 和 const 的顶级声明不会定义在全局上下文中，但在作用域链解析上效果是一样的。上下文在其所有代码都执行完毕后会被销毁，包括定义在它上面的所有变量和函数（全局上下文在应用程序退出前才会被销毁，比如关闭网页或退出浏览器）。
```js
var color = "blue"; 
function changeColor() { 
     if (color === "blue") { 
         color = "red"; 
     } else { 
         color = "blue"; 
     } 
} 
changeColor();
console.log(color); // red

// 解释：函数 changeColor()的作用域链包含两个对象：一个是它自己的变量对象（就
// 是定义 arguments 对象的那个），另一个是全局上下文的变量对象。这个函数内部之所以能够访问变量
// color，就是因为可以在作用域链中找到它。

let color = "blue"; 
function changeColor() { 
     if (color === "blue") { 
         color = "red"; 
     } else { 
         color = "blue"; 
     } 
} 
changeColor();
// 会提示 Uncaught SyntaxError: Identifier 'color' has already been declared，let 或者 const 声明的变量只会在当前作用域下，不会成为上下文对象的属性
```
#### 1.使用 var 的函数作用域声明
在使用 var 声明变量时，变量会被自动添加到最接近的上下文。在函数中，最接近的上下文就是函数的局部上下文。在 with 语句中，最接近的上下文也是函数上下文。如果变量未经声明就被初始化了，那么它就会自动被添加到全局上下文，如下面的例子所示：
```js
function add(num1, num2) {
    var sum = num1 + num2;
    return sum;
}
let result = add(10, 20); // 30
console.log(sum); // 报错：sum 在这里不是有效变量
```
这里，函数 add()定义了一个局部变量 sum，保存加法操作的结果。这个值作为函数的值被返回，但变量 sum 在函数外部是访问不到的。如果省略上面例子中的关键字 var，那么 sum 在 add()被调用之后就变成可以访问的了，如下所示：
```js
function add(num1, num2) {
    sum = num1 + num2;
    return sum;
}
let result = add(10, 20); // 30
console.log(sum); // 30
```
这一次，变量 sum 被用加法操作的结果初始化时并没有使用 var 声明。在调用 add()之后，sum被添加到了全局上下文，在函数退出之后依然存在，从而在后面可以访问到。var声明会被拿到函数或全局作用域的顶部，位于作用域中所有代码之前。这个现象叫作“提升”（hoisting）。提升让同一作用域中的代码不必考虑变量是否已经声明就可以直接使用。可是在实践中，提升也会导致合法却奇怪的现象，即在变量声明之前使用变量。
#### 2.使用 let 的块级作用域声明
ES6 新增的 let 关键字跟 var 很相似，但它的作用域是块级的，这也是 JavaScript 中的新概念。块级作用域由最近的一对包含花括号{}界定。换句话说，if 块、while 块、function 块，甚至连单独的块也是 let 声明变量的作用域。

let 与 var 的另一个不同之处是在同一作用域内不能声明两次。重复的 var 声明会被忽略，而重复的 let 声明会抛出 SyntaxError。
```js
var a;
var a;
// 不会报错
{
    let b;
    let b;
}
// SyntaxError: 标识符 b 已经声明过了
```
let 的行为非常适合在循环中声明迭代变量。使用 var 声明的迭代变量会泄漏到循环外部，这种情况应该避免。来看下面两个例子：
```js
for (var i = 0; i < 10; ++i) {}
console.log(i); // 10
for (let j = 0; j < 10; ++j) {}
console.log(j); // ReferenceError: j 没有定义
```
严格来讲，let 在 JavaScript 运行时中也会被提升，但由于“暂时性死区”（temporal dead zone）的缘故，实际上不能在声明之前使用 let 变量。因此，从写 JavaScript 代码的角度说，let 的提升跟 var是不一样的。
#### 3.使用 const 的常量声明
除了 let，ES6 同时还增加了 const 关键字。使用 const 声明的变量必须同时初始化为某个值。一经声明，在其生命周期的任何时候都不能再重新赋予新值。
```js
const a; // SyntaxError: 常量声明时没有初始化
const b = 3;
console.log(b); // 3
b = 4; // TypeError: 给常量赋值
const 除了要遵循以上规则，其他方面与 let 声明是一样的：
if (true) { 
 const a = 0; 
} 
console.log(a); // ReferenceError: a 没有定义
```
const 声明只应用到顶级原语或者对象。换句话说，赋值为对象的 const 变量不能再被重新赋值为其他引用值，但对象的键则不受限制。
```js
const o1 = {};
o1 = {}; // TypeError: 给常量赋值
const o2 = {};
o2.name = 'Jake';
console.log(o2.name); // 'Jake'
// 如果想让整个对象都不能修改，可以使用 Object.freeze()，这样再给属性赋值时虽然不会报错，但会静默失败：
const o3 = Object.freeze({});
o3.name = 'Jake';
console.log(o3.name); // undefined
```
由于 const 声明暗示变量的值是单一类型且不可修改，JavaScript 运行时编译器可以将其所有实例都替换成实际的值，而不会通过查询表进行变量查找。谷歌的 V8 引擎就执行这种优化。