### MutationObserver

接口提供了监视对 DOM 树所做更改的能力

```js
// 选择需要观察变动的节点
const targetNode = document.getElementById("some-id");

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function (mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  for (let mutation of mutationsList) {
    if (mutation.type === "childList") {
      console.log("A child node has been added or removed.");
    } else if (mutation.type === "attributes") {
      console.log("The " + mutation.attributeName + " attribute was modified.");
    }
  }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

在react中useEffect中使用时，注意同时操作删除节点和加入节点，会走进死循环，，如果存在这种情况可以先停止监听，DOM
操作完毕后再进行监听
```js
useEffect(() => {
  const targetNode = document.getElementById("some-id");
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    observer.disconnect();
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        console.log("A child node has been added or removed.");
      } else if (mutation.type === "attributes") {
        console.log("The " + mutation.attributeName + " attribute was modified.");
      }
    }
    observer.observe(targetNode, config);
  };
  
  observer.observe(targetNode, config);
  
  return observer.disconnect();
},[prop])
```