```js
component.forceUpdate(callback)
 
this.forceUpdate(callback) 来使用 强制更新 在需要强制更新的组件内使用 
```
forceUpdate API 会强制页面更新

默认情况，当你的组件或状态发生改变，你的组件将会重渲。若你的render()方法依赖其他数据，你可以通过调用forceUpdate()来告诉React组件需要重渲。

调用forceUpdate()将会导致组件的 render()方法被调用，并忽略shouldComponentUpdate()。这将会触发每一个子组件的生命周期方法，不覆盖子组件的shouldComponentUpdate() 方法。 若当标签改变，React仅会更新DOM。通常你应该尝试避免所有forceUpdate() 的用法并仅在render()函数里从this.props和this.state读取数据。
