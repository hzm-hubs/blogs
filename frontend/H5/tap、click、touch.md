## 一：click与tap比较
click与tap都会触发点击事件，但是在手机web端，click会有200-300ms的延迟，所以一般用tap代替click作为点击事件。singleTap 和doubleTap分别代表单次点击和双次点击，longtap代表长按事件

## 二：tap的穿透处理
使用zepto框架的tap的点击事件，来规避click事件的延迟响应，会出现穿透，即点击会触发非当前层的点击事件。

## 三：穿透原因
问题：在HTML5点击了q以后，弹出b的弹框

因为tap事件是通过document绑定了touchstart和touchend事件实现，$('.q')上，当touchend事件冒泡到document上以后执行$(this).hide();此时$('.b'),就处在了页面的最前面

现在touchend冒泡到了document上，并且$('.b')在页面的最前面，然后就触发了click事件

## 四：解决穿透问题
1. github上有一个叫做fastclick的库，它能规避移动设备上click事件的延迟响应https://github.com/ftlabs/fastclick将它用script标签引入页面(该库支持AMD，可按照AMD规范，用require.js的模块加载器引入)，并且在dom  ready时初始化在body上，如：
```
$(function(){
    new FastClick(document.body);
})
```
然后给需要“无延迟点击”的元素绑定click事件（注意不再是绑定zepto的tap事件）即可。

也可以不在body上初始化它，而在某个dom上初始化，这样，只有设个dom和它的子元素才能享受"无延迟"的点击

实践开发中，当元素绑定fastclick后，click响应速度比tap还要快一点。

2. 为元素绑定touchend事件，并在内部加上e.preventDefault();
```
$demo.on('touchend',function(e){
//改变了事件名称，tap是body上才被触发，而touchend是原生的事件，在dom本身上就会被捕获触发
$demo.hide();
e.preventDefault();//阻止“默认行为”
});
```
## 五：touch事件
touch是针对触屏手机上的触摸事件。现金大多数触屏手机webkit内核提供了touch事件的监听

包含：touchstart、touchmove、touchend、touchcancel四个事件
touchstart、touchmove、touchend事件可以类比于mousedown、mouseover、mouseup的触发，也可以使用touchstart、touchmove 、touchend 模拟 tap 事件
