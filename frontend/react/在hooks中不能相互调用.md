在案例助手中渲染历史会话场景提示：

 Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.
    at Object.throwInvalidHookError (mf-dep____vendor.d3130f9b.js:206674:9)
    at useId (mf-dep____vendor.d3130f9b.js:230485:21)
    at newMessage (index.tsx:120:1)
    at index.tsx:138:1
    at new Promise (<anonymous>)
    at handleAnswer (index.tsx:129:1)
    at _callee4$ (index.tsx:324:1)
    at tryCatch (regeneratorRuntime.js:45:1)
    at Generator.<anonymous> (regeneratorRuntime.js:133:1)
    at Generator.next (regeneratorRuntime.js:74:1)
    at asyncGeneratorStep (asyncToGenerator.js:3:1)
    at _next (asyncToGenerator.js:22:1)

发现在频繁使用useState更新会话列表时，会话id使用了 useId() 钩子，用时间戳替换 useId() 作为id使用就可以了