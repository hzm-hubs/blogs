vue2项目组件声明回调格式需要与调用时一直，vue2不能自动hyphenated(hyphenated)，若声明时为驼峰，调用时采用 hyphenated，回调函数回执行不到

```
// 声明：
emits("time-back",……)

// 调用：
<your-component @time-back="handleBack"></your-component>
```