单页应用的原理从早起的根据url的hash变化，到根据H5的history的变化，实现无刷新条件下的页面重新渲染。

### 通过hash来实现单页路由
早期的前端路由是通过改变`window.location`的hash属性来实现的：改变url的hash值是不会刷新页面的。如：
```js
window.location.hash='detail'
```
来实现改变当前url的hash值。执行上述的hash赋值后，页面的url发生改变
赋值前：http://localhost:6001 赋值后：http://localhost:6001/#detail

在url中多了以#结尾的hash值，但是赋值前后虽然页面的hash值改变导致页面完整的url发生了改变，但是页面是不会刷新的。

此外，除了可以通过window.location.hash来改变当前页面的hash值外，还可以通过html的a标签来实现：
```js
<a href="#edit">edit</a>
```
### 通过history实现前端路由
HTML5的History接口，History对象是一个底层接口，不继承于任何的接口。History接口允许我们操作浏览器会话历史记录。

History提供了一些属性和方法。

History的属性：
* History.length: 返回在会话历史中有多少条记录，包含了当前会话页面。此外如果打开一个新的Tab，那么这个length的值为1
* History.state: 保存了会出发popState事件的方法，所传递过来的属性对象（后面会在pushState和replaceState方法中详细的介绍）

History方法：
* History.back(): 返回浏览器会话历史中的上一页，跟浏览器的回退按钮功能相同
* History.forward():指向浏览器会话历史中的下一页，跟浏览器的前进按钮相同
* History.go(): 可以跳转到浏览器会话历史中的指定的某一个记录页
* History.pushState():pushState可以将给定的数据压入到浏览器会话历史栈中，该方法接收3个参数，对象，title和一串url。pushState后会改变当前页面url，但是不会伴随着刷新
* History.replaceState():replaceState将当前的会话页面的url替换成指定的数据，replaceState后也会改变当前页面的url，但是也不会刷新页面。

上面的方法中，pushState和repalce的相同点：
就是都会改变当前页面显示的url，但都不会刷新页面。

不同点：
pushState是压入浏览器的会话历史栈中，会使得History.length加1，而replaceState是替换当前的这条会话历史，因此不会增加History.length.