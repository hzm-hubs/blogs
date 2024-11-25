### svg: 矢量插画图形

使用

## 1.使用 img 标签或者 object 标签访问，这种方法不能改变插图原有的填充颜色

```html
{/* 链接访问使用 不支持配置颜色， 如img、object */}
<img src={icon} alt="" />
<div>
<object data={icon}></object>
</div>
```

适用于`外部在线链接`或者`本地静态资源`(public目录下)

## 2.使用函数方法导入本地svg图形文件，使用父级可覆盖其颜色
```html
<div style={{ color: '#3d7fff', fill: '#3d7fff' }}>
<svg
    width="16px"
    height="16px"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
>
    <title>首页</title>
    <g id="home" transform="translate(10, 12)">
        <rect
        id="矩形"
        fill="currentColor"
        opacity="0"
        x="0"
        y="0"
        width="16"
        height="16"
        ></rect>
        <path
        d="M8,1.5 L13.8643047,5.51319591 C14.2631047,5.79848521 14.5,6.25766673 14.5,6.74703964 L14.5,12.9803686 C14.5,13.3998069 14.3292905,13.7794677 14.0535299,14.0543191 C13.7771708,14.3297671 13.395349,14.5 12.9736883,14.5 L10.7105281,14.5 L10.7105281,12.0623574 C10.7105281,11.3157368 10.4069914,10.6396762 9.91601978,10.1503232 C9.42564675,9.66156677 8.74825525,9.3591169 8,9.3591169 C7.25174475,9.3591169 6.57435325,9.66156677 6.08398022,10.1503232 C5.59300859,10.6396762 5.28947187,11.3157368 5.28947187,12.0623574 L5.28947187,14.5 L3.0263117,14.5 C2.604651,14.5 2.22282916,14.3297671 1.94647005,14.0543191 C1.67070953,13.7794677 1.5,13.3998069 1.5,12.9803686 L1.5,6.74721177 C1.5,6.25778334 1.7368443,5.79852171 2.13569822,5.51319379 L7.53899023,1.64778427 C7.67675154,1.54922297 7.83838754,1.5 8,1.5 Z"
        id="路径"
        stroke="currentColor"
        ></path>
    </g>
</svg>
</div>
```
## 使用 use 标签访问 也可以实现颜色可配
参考链接：https://juejin.cn/post/6918723151732391950

svg-sprite-loader，svgo-loader
```xml
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>
    .classA { fill:red }
  </style>
  <defs>
    <g id="Port">
      <circle style="fill:inherit" r="10"/>
    </g>
  </defs>

  <text y="15">black</text>
  <use x="50" y="10" xlink:href="#Port" />
  <text y="35">red</text>
  <use x="50" y="30" xlink:href="#Port" class="classA"/>
  <text y="55">blue</text>
  <use x="50" y="50" xlink:href="#Port" style="fill:blue"/>
 </svg>
```
