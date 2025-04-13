```js
// Promise 三种状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class MyPromise {
  constructor(executor) {
    this.state = PENDING   // 初始状态
    this.value = null      // 成功值
    this.reason = null     // 失败原因
    this.onFulfilledCallbacks = [] // 成功回调队列
    this.onRejectedCallbacks = []  // 失败回调队列

    // 立即执行传入的函数
    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value
        // 执行所有成功回调
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = reason
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    // 处理值穿透
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

    // 返回新 Promise 实现链式调用
    const promise2 = new MyPromise((resolve, reject) => {
      const handleMicrotask = (fn, arg) => {
        // 用 setTimeout 模拟微任务队列
        setTimeout(() => {
          try {
            const x = fn(arg)
            this.resolvePromise(promise2, x, resolve, reject)
          } catch (err) {
            reject(err)
          }
        })
      }

      if (this.state === FULFILLED) {
        handleMicrotask(onFulfilled, this.value)
      } else if (this.state === REJECTED) {
        handleMicrotask(onRejected, this.reason)
      } else {
        // 异步情况暂存回调
        this.onFulfilledCallbacks.push(() => handleMicrotask(onFulfilled, this.value))
        this.onRejectedCallbacks.push(() => handleMicrotask(onRejected, this.reason))
      }
    })

    return promise2
  }

  resolvePromise(promise2, x, resolve, reject) {
    // 防止循环引用
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected'))
    }

    // 处理 thenable 对象
    if (x && (typeof x === 'object' || typeof x === 'function')) {
      let called = false // 防止重复调用
      try {
        const then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              this.resolvePromise(promise2, y, resolve, reject)
            },
            r => {
              if (called) return
              called = true
              reject(r)
            }
          )
        } else {
          resolve(x)
        }
      } catch (err) {
        if (called) return
        reject(err)
      }
    } else {
      resolve(x)
    }
  }

  catch(onRejected) {
    return this.then(null, onRejected)
  }

  // 静态方法
  static resolve(value) {
    if (value instanceof MyPromise) return value
    return new MyPromise(resolve => resolve(value))
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason))
  }

  // all、race、allSettled 等其他静态方法省略
}
```

状态机机制：三种状态切换（pending → fulfilled/rejected）

异步队列：使用回调队列处理异步注册的 then 回调

链式调用：每个 then 返回新 Promise，实现链式调用

值穿透：处理未传回调函数时的默认值传递

Promise解析：递归处理 thenable 对象（核心难点）

错误处理：try/catch 包裹关键执行步骤

微任务模拟：使用 setTimeout 模拟微任务队列, 真实 Promise 使用微任务队列（microtask）

使用示例：
```
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('success'), 1000)
})

p.then(res => {
  console.log(res) // 1秒后输出 "success"
  return 'chain'
}).then(res => {
  console.log(res) // 输出 "chain"
}).catch(err => {
  console.error(err)
})
```