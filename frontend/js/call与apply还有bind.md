### apply
```
语法：func.apply(thisArg, [argsArray])

thisArg
    必选的。在 func 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数处于非严格模式下，
    则指定为 null 或 undefined 时会自动替换为指向全局对象，原始值会被包装。

argsArray
    可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 func 函数。如果该参数的值为 null 或  undefined，
    则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。

返回值
    调用有指定this值和参数的函数的结果。
    
方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
```

### call
```
语法：function.call(thisArg, arg1, arg2, ...)

参数
 thisArg
    在 function 函数运行时使用的 this 值。请注意，this可能不是该方法看到的实际值：如果这个函数会出现非严格模式下，则指定为 null 或 undefined 时为自动对象，原始值被包装。
 arg1, arg2, ...
    指定的参数列表。

 返回值
 	使用调用者提供的this值和调用该函数的返回值。如果该方法没有返回值，则返回undefined。

方法使用一个指定的this值和单独给出的一个或多个参数来调用一个函数。
```
call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。严格模式下, thisarg位置应该是null 或者 undefined
### bind
```
bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被指定为bind()第一个参数，其余参数将作为新函数的参数，供调用时使用。

语法： function.bind(thisArg[, arg1[, arg2[, ...]]])

thisArg
    绑定调用函数时作为this参数传递给目标函数的值。使用如果new运算符构造绑定函数，则忽略该值。
    使用当bind在setTimeout中创建³³一个函数（作为回调提供）时，作为thisArg传递的任何原始值都将转换为object。
    如果bind函数的参数为​​空，或者thisArg是null或undefined，执行作用域的this将被转化为新函数的thisArg。
arg1, arg2, ...
    当目标函数被调用时，被预置入绑定函数的参数列表中的参数。

返回值
    返回一个原函数的拷贝，并拥有指定的this值和初始参数。
```

### 区别

1.返回值不用

call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。

2.参数不同

call、bind和apply的第一个参数都是要改变上下文的对象，而call、bind从第二个参数开始以参数列表的形式展现.
apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数

3.执行时间不同

bind方法是事先把函数的this改变为我们要想要执行的上下文的结果，并且把对应的参数值准备好，以后要用到了，调用即可，也就是说bind同样可以改变this的指向，但和apply、call不同就是不会马上执行

### 应用

1.输出最大值
```js
let datas = [2,3,5,8,3,5]
Math.max.apply(null,datas) // 8
Math.max.call(null,...datas) // 8

// bind
this.x = 9;    // 在浏览器中，this 指向全局的 "window" 对象
var module = {
   x: 81,
   getX: function() { return this.x; }
};
 module.getX(); // 81
 var retrieveX = module.getX;
 retrieveX();
 // 返回 9 因为函数是在全局作用域中调用的

// 创建一个新函数，把 'this' 绑定到 module 对象
// 新手可能会将全局变量 x 与 module 的属性 x 混淆
var boundGetX = retrieveX.bind(module);
boundGetX(); // 81
```

2.将伪数组转化为数组（含有length属性的对象，dom节点, 函数的参数arguments）

javascript中的伪数组(例如通过document.getElementsByTagName获取的元素、含有length属性的对象)具有length属性，并且可以通过0、1、2…下标来访问其中的元素，但是没有Array中的push、pop等方法。就可以利用call，apply来转化成真正的数组，就可以使用数组的方法了

```js
1.dom节点中类数组结构
<div class="div1">1</div>
<div class="div1">2</div>
<div class="div1">3</div>
let div = document.getElementsByTagName('div');
console.log(div); // HTMLCollection(3) [div.div1, div.div1, div.div1] 里面包含length属性
let arr2 = Array.prototype.slice.call(div);
console.log(arr2); // 数组 [div.div1, div.div1, div.div1]

2.fn内的arguments
function fn10() {
    return Array.prototype.slice.call(arguments);
}
console.log(fn10(1,2,3,4,5)); // [1, 2, 3, 4, 5]
注意slice方法,在不传递任何参数的情况下,是会返回整个数组的

3.含有length属性的对象
let obj4 = {
	0: 1,
	1: 'thomas',
	2: 13,
	length: 3 // 一定要有length属性
};
console.log(Array.prototype.slice.call(obj4)); // [1, "thomas", 13]
```

3.数组拼接，添加
```js
let arr1 = [1,2,3];
let arr2 = [4,5,6];

//数组的concat方法：返回一个新的数组
let arr3 = arr1.concat(arr2); 
console.log(arr3); // [1, 2, 3, 4, 5, 6]

console.log(arr1); // [1, 2, 3] 不变
console.log(arr2); // [4, 5, 6] 不变
// 用 apply方法
[].push.apply(arr1,arr2);  // 给arr1添加arr2
console.log(arr1); // [1, 2, 3, 4, 5, 6]
console.log(arr2); // [4, 5, 6] 不变
```

4.判断变量类型
```
let arr1 = [1,2,3];
let str1 = 'string';
let obj1 = {name: 'thomas'};
//
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
console.log(fn1(arr1)); // true

//  判断类型的方式，这个最常用语判断array和object，null(因为typeof null等于object)  
console.log(Object.prototype.toString.call(arr1)); // [object Array]
console.log(Object.prototype.toString.call(str1)); // [object String]
console.log(Object.prototype.toString.call(obj1)); // [object Object]
console.log(Object.prototype.toString.call(null)); // [object Null]
```

5.继承
```js
利用call和apply做继承
function Animal(name){      
    this.name = name;      
    this.showName = function(){      
        console.log(this.name);      
    }      
}      
function Cat(name){    
    Animal.call(this, name);    
}      
// Animal.call(this) 的意思就是使用this对象代替Animal对象，那么
// Cat中不就有Animal的所有属性和方法了吗，Cat对象就能够直接调用Animal的方法以及属性了
var cat = new Cat("TONY");     
cat.showName();   //TONY

多继承
  function Class1(a,b) {
    this.showclass1 = function(a,b) {
      console.log(`class1: ${a},${b}`);
    }
  }

  function Class2(a,b) {
    this.showclass2 = function(a,b) {
      console.log(`class2: ${a},${b}`);
    }
  }

  function Class3(a,b,c) {
    Class1.call(this);
    Class2.call(this);
  }

  let arr10 = [2,2];
  let demo = new Class3();
  demo.showclass1.call(this,1); // class1: 1,undefined
  demo.showclass1.call(this,1,2); // class1: 1,2
  demo.showclass2.apply(this,arr10); // class2: 2,2
```

三种方法主要用来改变this指向，综合其他的改变this指向的有以下几种方法
1. 使用 ES6 的箭头函数
2. 在函数内部使用 _this = this
3. 使用 apply、call、bind
4. new 实例化一个对象