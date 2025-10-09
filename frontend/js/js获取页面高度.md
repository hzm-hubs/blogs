
网页可见域宽（不包括边框）：document.body.clientWidth 包括内容和内边距，整个文档宽度，即使被卷出去挡住的
网页可见域高（不包括边框）：document.body.clientHeight 包括内容和内边距，整个文档高度，即使被卷出去挡住的
网页可见域宽（包括边框）：document.body.offsetWidth 包括内容、内边距、边框，整个文档宽度，即使被卷出去挡住的
(ps: document.body.clientHeight === document.body.clientHeight)
网页可见域高（包括边框）：document.body.offsetHeight 包括内容、内边距、边框，整个文档宽度，即使被卷出去挡住的

网页正文全文宽：document.body.scrollWidth 基本等同于document.body.clientWidth
网页正文全文高：document.body.scrollHeight 基本等同于document.body.clientHeight 

网页被卷去的高：document.body.scrollTop 
网页被卷去的左：document.body.scrollLeft 

网页正文部分上：window.screenTop 
网页正文部分左：window.screenLeft 

屏幕分辨率的高：window.screen.height 
屏幕分辨率的宽：window.screen.width 

屏幕可用工作区高度：window.screen.availHeight 
屏幕可用工作区宽度：window.screen.availWidth

offsetLeft：元素的左外边框至包含元素的左内边框之间的距离（书上）。经实际测试，其实为元素左外边框至html左内边框的距离
offsetTop：元素的上外边框至包含元素的上内边框之间的距离（书上）。经实际测试，其实为元素上外边框至html上内边框的距离。可能不同浏览器对其结果不同。

document.documentElement.clientHeight: 视口高度,混杂模式下用body代替documentElement
document.documentElement.scrollHeight：内容区高度

经实测：

获取视口高度推荐使用：document.documentElement.clientHeight或者window.innerHeight

获取文档总高度推荐使用：document.documentElement.scrollHeight
```
mounted:function(){
 this.tableHeight = window.innerHeight - this.$refs.table.$el.offsetTop - 50;
}
//window.innerHeight:浏览器的可用高度//this.$refs.table.$el.offsetTop：表格距离浏览器的高度//后面的50：根据需求空出的高度，自行调整
```