组件页面引用 umi 内部API时提示

![alt text](./images/types.png)

当前 umi 没有类型定义的 types 库，可以在`.d.ts`文件中用 declare module 添加声明
```ts
declare module 'umi'
```
`.d.ts`文件需要在tsconfig文件中添加