中间件官方链接： https://zh.nuxtjs.org/docs/2.x/directory-structure/middleware/
总的分为三类
```
Router middleware 
Named middleware
Anonymous middleware
```
中间件在项目启动时会执行一次，然后在路由跳转进行跳转时也会执行一次。我们可以利用中间件呈现我们自定义的页面或页面组(布局)之前运行的自定义函数。当然也可以对页面进行特殊处理，在该页面单纯声明middleware函数
中间件将按以下顺序串联执行：
numxt.config.js文件（按文件中的顺序）

匹配的布局

匹配的页面

页面单独处理时
```js
<template>
  <h1>Secret page</h1>
</template>

<script>
  export default {
    middleware({ store, redirect }) {
      // If the user is not authenticated
      if (!store.state.authenticated) {
        return redirect('/login')
      }
    }
  }
</script>
```
统一处理如下
```js
// middleware/auth
// 用户登录相关信息
export default function ({ route, redirect, store, error }) {
    const { fullPath, path } = route;
    // if (path.includes('register') || path.includes('official')) {
    //     return;
    // }
    if (!store.state.user) {
        if (path != '/sign') {
            // TODO: 权限可以在这里处理
            console.log('您需要登录');
            return redirect(`/sign`);
        }
    } else if (path == '/') {
        // TODO: 权限可以在这里处理
        return redirect(`/home`);
    } else if (!route.name || !route.matched) {
        // 当前项目中并未存在该路径的，定位到任务页面
        console.log('您输入的路径不存在');
        return redirect('/home');
    }
}

// 然后在nuxt.config配置文件中注入使用
{
    ………………
    router: {
        middleware: 'auth',
    }
}
```
