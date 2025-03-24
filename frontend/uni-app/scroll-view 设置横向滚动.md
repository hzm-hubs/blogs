1.给scroll-view设置样式
```
 white-space: nowrap
```
2.然后scroll-view里面的子项要设置样式为
```
display: inline-block;
```
3.接着scroll-view的属性scroll-x要设置为true
```
scroll-x="true"
```

如果这都不出现滚动，那么原因可能有二：
1.scroll-view的宽度大于或等于父级的宽度，解决方案为：手动设置scroll-view的宽度，直至能滑动为止，比如：
```
width: 92vw
```
2.浏览器兼容性问题，可尝试先给scroll-view设置样式：
```
overflow-x: scroll;
overflow: auto;
```

#### scroll-view 与 position: sticky
scroll-view 设置设置固定距离后 ，会导致有设置粘贴属性的子元素失效，但是添加为 scroll-view 添加 maxHeight 属性，粘贴属性可以生效；
查阅资料发现 position: sticky( 粘贴属性 ) 生效条件需要满足
1. 我们在设置粘性定位的时候，一定要指定 top, right, bottom 或 left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。
2. 父元素高度没子元素高，通常为父元素设置 height:100%;
3. 父元素设置了 overflow 属性也会使粘性定位失效;