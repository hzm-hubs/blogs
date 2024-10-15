declare 当使用一些第三方库时，并没有相关的@types/pluginname插件，可以借助 decale 关键字声明该关键字，关闭ts检测提示；此外还可以声明一些函数或变量，可以在 typescript 代码中使用。

使用位置： typescript 声明文件(*.d.ts)。如果是自定义的声明文件，需要在 tsconfig.json 文件中引入

使用声明关键字，您可以声明：

- declare var 声明全局变量
- declare function 声明全局方法
- declare class 声明全局类
- declare enum 声明全局枚举类型
- declare namespace 声明（含有子属性的）全局对象
- interface 和 type 声明全局类型
- export 导出变量
- export namespace 导出（含有子属性的）对象
- export default ES6 默认导出
- export = commonjs 导出模块
- export as namespace UMD 库声明全局变量
- declare global 扩展全局变量
- declare module 扩展模块

- 变量（const、let、var）。
```ts
declare const dataLayer: any[];
declare let dataList: any[];
declare var name: number; // 全局变量
```
- 类
```ts
declare class Animal { 
    constructor(name: string);
    eat(): void;
    sleep(): void;
}
```
- 接口
```ts
interface AjaxSettings {
    method?: 'GET' | 'POST'
    data?: any;
}
declare namespace jQuery {
    function ajax(url: string, settings?: AjaxSettings): void;
}
```
- 一个枚举
```ts
declare enum typeList = [1,2,3,4]
```
- 一个功能
```ts
declare function sayHello(hello: string): void {
    console.log(123)
}
```
- 一个模块
在这些情况下，您必须为每个模块创建一个声明。
例如，如果我们想在代码中使用 PNG，我们可以创建如下声明：
```ts
declare module '*.png' { 
    const src: string; 
    export default src;
}
declare module 'umi'
```
- 命名空间
```ts
declare namespace AnimalLib {    
    class Animal {       
        constructor(name: string);
        eat(): void;
        sleep(): void;
    }
    type Animals = 'Fish' | 'Dog';
}
```
- 将声明添加到全局范围并进行扩展
```ts
declare global {    
    interface String {
        toSmallString(): string;
    }
}
String.prototype.toSmallString = (): string => {    // implementation.
    return '';
};
```