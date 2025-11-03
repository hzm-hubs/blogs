meta标签用来描述一个HTML网页文档的属性，有关页面的元信息，主要有两个属性：name 和 http-equiv

1、`<meta name="参数" content="具体的描述">`
name属性主要用于描述网页，比如网页的关键词，叙述等。属性值为content，content中的内容是对name填入类型的具体描述，便于搜索引擎抓取。

2、name的参数

①、keywords：网页关键字
```
<meta name="keywords" content="food, water">
```

②、description：网站内容的描述，网站主要内容
```
<meta name="description" content="Study English online">
```
③、viewport：移动端视口，仅供移动设备使用
device-width 将布局视口设置为设备宽度，CSS 像素与设备独立像素按 1:1 映射，避免默认 980px 布局导致整体缩小。
```
<meta name="viewport" content="width=device-width, initial-scale=1">
```
④、robots：搜索引擎爬虫的索引方式，content不填默认为all
```
<meta name="robots" content="all|none|index|noindex|follow|nofollow">
```
none : 搜索引擎将忽略此网页，等价于noindex，nofollow

noindex : 搜索引擎不索引此网页

nofollow: 搜索引擎不继续通过此网页的链接索引搜索其它的网页

all : 搜索引擎将索引此网页与继续通过此网页的链接索引，等价于index，
follow

index : 搜索引擎索引此网页

follow : 搜索引擎继续通过此网页的链接索引搜索其它的网页
⑤、author：作者
```
<meta name="author" content="Sheldon">
```
⑥、copyright：标注版权信息
```
<meta name="copyright" content="yixinli"> //代表该网站为yixinli版权所有
```
⑦、revisit-after：搜索引擎爬虫重访时间
```
<meta name="revisit-after" content="one week" >
```
3、`<meta http-equiv="参数" content="具体的描述">`
http-equiv相当于http文件头的作用

4、http-equiv的参数：

①、content-Type：声明字符编码
```
<meta charset="utf-8">  // H5新增，推荐使用
<meta http-equiv="content-Type" content="text/html;charset=utf-8"> //旧的HTML
```
②、cache-control：指定请求和响应遵循的缓存机制
```
<meta http-equiv="cache-control" content="no-cache">
```
content的值有：

no-cache: 先发送请求，与服务器确认该资源是否被更改，如果未被更改，则使用缓存

no-store: 不允许缓存，每次都要去服务器上，下载完整的响应

public : 缓存所有响应，但并非必须。因为max-age也可以做到相同效果

private : 只为单个用户缓存，因此不允许任何中继进行缓存

maxage : 表示当前请求开始，该响应在多久内能被缓存和重用，而不去服务器重新请求。例如：max-age=60表示响应可以再缓存和重用 60 秒。

no-siteapp：禁止百度自动转码

③、expires：网页到期时间，到期后网页必须到服务器上重新传输。
```
<meta http-equiv="expires" content="Sunday 26 October 2018 10:00 GMT" />
```
④、refresh：自动刷新并指向某页面
```
<meta http-equiv="refresh" content="2; URL=http://www.sina.com/"> //意思是2秒后跳转新浪
```
⑤、X-UA-Compatible：浏览器采取何种版本渲染当前页面
```
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> //指定IE和Chrome使用最新版本渲染当前页面
```
⑥、Set-Cookie：为页面定义cookie

如果网页过期，那么这个网页存在本地的cookies也会被自动删除。
```
<meta http-equiv="Set-Cookie" content="name, date"> //格式
```