当提示 

```
vue Uncaught Error: Redirected when going from “/*“ to “/*“
```
或者
```
Uncaught (in promise) Error: Avoided redundant navigation to current location: "/admin".`
```
大概率是vue2与vueRouter路由重复定向导致的。vue-router3以上版本在导航首位`beforEach`中返回是 `promise`对象，当vue2页面内push的then方法接收失败，走到catch中，弹出上面的报错信息。

* 解决方法1
在出错处router的push方法添加catch处理

```
this.$router.push((path:***)).catch(err => err)
```
* 方法2
在注册使用vue-router前重写push方法
```
const originPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	console.log('location', location, onResolve, onReject)
	if (onResolve || onReject) return originPush.call(this, location, onResolve, onReject)
	return originPush.call(this, location).catch(err => err)
}
// 注册使用VueRouter
Vue.use(VueRouter)
```
* 方法3
  
降低vue-router版本到3以下

<br>

[参考链接](https://github.com/vuejs/vue-router/issues/2881)