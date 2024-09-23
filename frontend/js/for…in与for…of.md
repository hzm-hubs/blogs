for...in 适用于可遍历的对象如array、object，包括其原型方法

for...of 该循环处理来自可迭代对象的值序列。可迭代对象包括内置对象的实例，例如 Array、String、TypedArray、Map、Set、NodeList（以及其他 DOM 集合），还包括 arguments 对象、由生成器函数生成的生成器，以及用户定义的可迭代对象。

俩者都可以用来遍历数组，但遍历子项不同
```js
const demoArray = [{name:'hliuliu'},{name:'oio'}]

for (let i in demoArray) console.log('i',i) // 0,1 输出的是索引
for (let i of demoArray) console.log('i',i) // {name:'hliuliu'},{name:'oio'} 输出的是子项
```
for...in 可以遍历对象数据，for...of不行
```js
const demoObject = {name:'hliuliu'}

for (let i in demoObject) console.log('i',i) // name 输出的key值
for (let [key，value] in demoObject) console.log(key,value) // name， 'hliuliu'
for (let i of demoObject) console.log('i',i) // TypeError: Invalid attempt to iterate non-iterable instance.In order to be iterable……
```