CDN参考
```
https://www.bootcdn.cn/  
```
1.CDN引入 
```
// 国内使用推荐CDN
<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
// 海外CDN
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/
font-awesome.min.csss">
```
2下载代码

https://www.runoob.com/font-awesome/fontawesome-tutorial.html
```html
<!DOCTYPE html>
<html>
    <head> 
    	<link rel="stylesheet" href="https://cdn.staticfile.org/font-awesome/4.7.0/css/font-awesome.css">
    </head>
    <body>
    	<i class="fa fa-car"></i> // 有i结尾标签 然后类名是先fa 再指定矢量图标fa-car
    </body>
</html>
```
其他参数:
```
<i>和<span>标签都能使用

<i class="fa fa-car fa-lg"></i> 
fa-lg会使图标增加33%,fa-2x,fa-3x.fa-4x,fa-5x类用于增加相对于其容器的图标大小

fa-ul 和 fa-li 类用于替换无序列表中的默认前缀。

fa-border，fa-pull-right 或 fa-pull-left 类用于拉式引用或文章图标。

fa-spin 类可以让图标旋转, fa-pulse 类可以使图标以 8 步为周期进行旋转。

fa-rotate-* 和 fa-flip-* 类用于旋转和翻转图标。
如下：
<i class="fa fa-shield fa-rotate-270"></i>
<i class="fa fa-shield fa-flip-horizontal"></i>
      
要堆叠多个图标，请使用父级上的 fa-stack 类，fa-stack-1x 类用于常规大小的图标，fa-stack-2x 用于较大的图标。
fa-inverse 类可以用作替代图标颜色。您还可以向父级添加更大的图标类，以进一步控制尺寸。
 
fa-fw 类用于设置固定宽度的图标。 当不同的图标宽度偏离对齐时，此类非常有用。 特别适用于Bootstrap的导航列表和列表组。
```