### 1.pop()
方法移除数组的最后一个元素并返回该元素。
```js
let arr = [1, 2, 3, 4, 5];
let lastElement = arr.pop(); // lastElement = 5, arr = [1, 2, 3, 4]
```
### 2.slice()
方法可以用负索引从数组的右侧开始取元素，而不会修改原数组。
```js
let arr = [1, 2, 3, 4, 5];
let lastElement = arr.slice(-1)[0]; // lastElement = 5
let lastTwoElements = arr.slice(-2); // lastTwoElements = [4, 5]
```
### 3.splice()
方法可以用负索引从数组的右侧开始取元素，同时会修改原数组。
```js
let arr = [1, 2, 3, 4, 5];
let lastElement = arr.splice(-1, 1)[0]; // lastElement = 5, arr = [1, 2, 3, 4]
```
### 4.at()
方法接受负索引从数组的右侧开始取元素，ES2022 引入。
```js
let arr = [1, 2, 3, 4, 5];
let lastElement = arr.at(-1); // lastElement = 5
```
### 5. reverse()
方法可以反转数组，然后取出元素，但会修改原数组。
```js
let arr = [1, 2, 3, 4, 5];
arr.reverse(); // arr = [5, 4, 3, 2, 1]
let firstElement = arr[0]; // firstElement = 5
```
### 6.使用 length 属性
```js
let arr = [1, 2, 3, 4, 5];
let lastElement = arr[arr.length - 1]; // lastElement = 5
```