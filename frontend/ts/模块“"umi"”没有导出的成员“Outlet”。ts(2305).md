组件页面引用 umi 内部API时提示

![alt text](./images/types.png)

当前 umi 没有类型定义的 types 库，可以用 declare module 添加声明
```
declare module 'umi'
```