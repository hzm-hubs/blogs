有时候，我们会想要为那些在编程阶段还不清楚类型的变量指定一个类型。 这些值可能来自于动态的内容，比如来自用户输入或第三方代码库。 这种情况下，我们不希望类型检查器对这些值进行检查而是直接让它们通过编译阶段的检查。 那么我们可以使用
any类型来标记这些变量：
```
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```
通过使用 any，我们破坏了 TypeScript 的能力引起了一些麻烦。没有强制的类型检查，可能会给您带来一些麻烦。
```
const dataMethod: any = 'Hello world!';
dataMethod.hello();
```
TypeScript 3.0中引入的 unknown类型也被认为是最高类型，但它更安全
```
let dataMethod: unknown = 'Hello'!;
dataMethod = 12;
dataMethod = { hello: () => 'Hello!' };
```
我们只能将 unknown 类型的变量赋值给 any 和 unknown。虽然都可以赋值给unknown，但是需要对unknown进行缩小类型，否则无法执行任何操作，TypeScript 不允许我们对类型为 unknown 的值执行任意操作
```
function dateMethod() {
 return '22'
}

const data: unknown = dateMethod();
data.hello(); // ts报错： Object is of type 'unknown'.ts(2571)
```
可以使用断言缩小未知范围，就像上面vant源码的操作，强制ts编译器相信我们自己在做什么。或者可以用instanceof来缩小变量的类型
```
type getPeople = () => unknown;
const man = getPeople();
if (man instanceof People) {
    console.log(man.name.toLowerCase());
}
```
当面对 setTimeout 或者 setInterval 函数返回值时可以使用 as（类型断言）
```
let timer = setTimeOut（（）=> {console.log(1)},1000）as unknown as number
```
