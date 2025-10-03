```js
function initCharts() {
  // 法1
  const tempPromise = new Promise((resolve) => {
    resolve()
  })
  tempPromise.then(() => {
    charts.access = echarts.init(document.getElementById('accessRef'))
  })
  

  // 法2 使用异步加载 echarts
  return new Promise(() => {
    charts.access = echarts.init(document.getElementById('accessRef'))
  })
  
  // 法3 只需要返回值可以使用 Promise.resolve，其中 resolve 里的值需是不再计算、延迟的结果(使用setTimeOut会直接返回计时Id, 不会等待任务执行)
  return Promise.resolve(1)
}
```