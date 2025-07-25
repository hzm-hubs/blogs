useEffect 是 React 中用于处理副作用操作的 Hook。它的执行时机取决于传递给它的第二个参数（依赖数组）以及组件的生命周期。

useEffect 接收两个参数：

1.第一个参数是一个函数，这个函数包含了需要执行的副作用操作。

2.第二个参数是一个依赖数组，它是一个数组，包含了影响副作用执行的依赖项。

- 只有首次挂载时执行
当依赖项为空数组时，只有组件首次挂载时才会执行，类似于 componentDidMount。
```js
useEffect(() => {
}, []);
```
- 如果你传递了一个包含依赖项的数组作为第二个参数，副作用函数会在每次这些依赖项发生变化时执行，以及在组件挂载时执行一次。
```js
const [someValue,setValue] = useState('');

useEffect(() => {
    // setValue() 被调用时会触发本副作用函数
}, [someValue]);
```
- 每次页面刷新都执行
```js
useEffect(() => {
});
```
useEffect 还可以通过 return 接受一个回调，在页面/组件销毁时执行，
```js
useEffect(() => {
    return () => {
        // 回调    
    }
});
// 首次执行函数也支持 注意不要直接return函数，会直接执行的
useEffect(() => {
    return () => {
        // 回调    
    }
}, []);

useEffect(() => {
  console.log("Effect ran");
}, [time]);
// 在组件首次渲染时，useEffect 中的副作用会执行。
// 如果 time 后续发生变化，useEffect 会再次执行。
```
问题
1.useEffect中监听到变量并调取接口，调取接口的方法使用了lodash中的防抖，但是变量更新几次，接口也会执行几次。是因为useEffect特性吗，每次都刷新了页面吗？
```js
    const getLookInfo = debounce(
        () => {
            console.log('请求接口')
        },
        400,
        {
            leading: false,
            trailing: true,
        }
    );

    useEffect(() => {
        console.log("userId", userId);
        if (userId) {
            getLookInfo();
        }
    }, [userId]);
```

2. 不能在 useEffect 初始函数中使用 useState 直接赋值

因为 react 组件接受到新值会重新渲染，useState 的赋值会影响页面展示或变量值充值

错误写法
```
const [count, setCount] = useState(0)

useEffect(() => {
  const timer = setInterval(() => {
    setCount(count + 1) // 🚨 这个 count 其实永远是 0
  }, 1000)
}, [])
```
改正
```
useEffect(() => {
  const timer = setInterval(() => {
    setCount(prevCount => prevCount + 1); // 永远获取最新值
  }, 1000);
  return () => clearInterval(timer);
}, []);
```