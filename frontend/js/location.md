
Javascript中的location.href有很多种用法，主要如下：
```js
self.location.href="/url" 当前页面打开URL页面
ocation.href="/url" 当前页面打开URL页面
windows.location.href="/url" 当前页面打开URL页面，前面三个用法相同。　　
this.location.href="/url" 当前页面打开URL页面　　
parent.location.href="/url" 在父页面打开新页面　　
top.location.href="/url" 在顶层页面打开新页面
```
     如果页面中自定义了frame，那么可将parent self top换为自定义frame的名称,效果是在frame窗口打开url地址
     此外，
```js
window.location.href=window.location.href;和window.location.Reload()和都是刷新当前页面。区别在于是否有提交数据。
当有提交数据时，window.location.Reload()会提示是否提交，
window.location.href=window.location.href;则是向指定的url提交数据。　　
"window.location.href"、"location.href"是本页面跳转       
"parent.location.href"是上一层页面跳转       
"top.location.href"是最外层的页面跳转
```
举例说明：
```js
如果A,B,C,D都是jsp，D是C的iframe，C是B的iframe，B是A的iframe，
如果D中js这样写
"window.location.href"、"location.href"：D页面跳转        
"parent.location.href"：C页面跳转       
"top.location.href"：A页面跳转

如果D页面中有form的话,
<form>: form提交后D页面跳转        
<form target="_blank">: form提交后弹出新页面       
<form target="_parent">: form提交后C页面跳转       
<form target="_top"> : form提交后A页面跳转         

关于页面刷新，D 页面中这样写：
"parent.location.reload();": C页面刷新 
（当然，也可以使用子窗口的 opener 对象来获得父窗口的对象：window.opener.document.location.reload(); ）
"top.location.reload();": A页面刷新


Javascript刷新页面的几种方法：        
1 history.go(0)        
2 location.reload()        
3 location=location        
4 location.assign(location)         
5 document.execCommand('Refresh')         
6 window.navigate(location)         
7 location.replace(location)         
8 document.URL=location.href 
9 location.search()方法 // 更新路径参数的同时重新渲染数据 只需要输入传参就行
eg: location.search = `courseId=${this.$route.query.courseId}&chapterId=${charterIndex}&secId=${sectionIndex}`;
```