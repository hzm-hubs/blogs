### referrer
在某些情况下，出于一些原因，网站想要控制页面发送给 server 的 referrer 信息的情况下，可以使用这一 referer metadata 参数。

参数

referer 的 metedata 属性可设置 content 属性值为以下集合：

- never
- always
- origin
  
结果

- 如果 referer-policy 的值为 never：删除 http head 中的 referer；
- 如果 referer-policy 的值为 default：如果当前页面使用的是 https 协议，而正要加载资源使用的是普通的 http 协议，则将 http header 中额 referer 置为空；
- 如果 referer-policy 的值 origin：只发送 origin 部分；
- 如果 referer-policy 的值为 always：不改变 http header 中的 referer 的值；
  
举例

如果页面中包含了如下 meta 标签，所有从当前页面中发起的请求将不会携带 referer：
```
<meta name="referrer" content="never">
```
如果页面中包含了如下 meta 标签，则从当前页面中发起的 http 请求将只携带 origin 部分：
```
<meta name="referrer" content="origin">
```
referrer 的值还有以下这些

1、no-referrer：所有请求不发送 referrer。

2、no-referrer-when-downgrade（默认值）：当请求安全级别下降时不发送 referrer。目前，只有一种情况会发生安全级别下降，即从 HTTPS 到 HTTP。HTTPS 到 HTTP 的资源引用和链接跳转都不会发送 referrer。

3、same-origin：对于同源的链接和引用，会发送referrer，其他的不会。

4、origin：在任何情况下仅发送源信息作为引用地址。源信息包括访问协议和域名。

5、strict-origin：在安全级别下降时不发送 referrer；而在同等安全级别的情况下仅发送源信息。注意：这个是新加的标准，有些浏览器可能还不支持。

6、origin-when-cross-origin：同源的链接和引用，会发送完全的 referrer 信息；但非同源链接和引用时，只发送源信息。

7、strict-origin-when-cross-origin：同源的链接和引用，会发送 referrer。安全级别下降时不发送 referrer。其它情况下发送源信息。注意：这个是新加的标准，有些浏览器可能还不支持。

8、unsafe-url：无论是否发生协议降级，无论是本站链接还是站外链接，统统都发送 Referrer 信息。正如其名，这是最宽松而最不安全的策略。

语法

Referrer-Policy: no-referrer

Referrer Policy 的设置方法

1、CSP（Content Security Policy），是一个跟页面内容安全有关的规范。在 HTTP 中通过响应头中的 Content-Security-Policy 字段来告诉浏览器当前页面要使用何种 CSP 策略。
```
 Content-Security-Policy: referrer no-referrer|no-referrer-when-downgrade|origin|origin-when-cross-origin|unsafe-url;
```
CSP 的指令和指令值之间以空格分割，多个指令之间用英文分号分割。

2、<meta> 标签
```
<meta name="referrer" content="no-referrer|no-referrer-when-downgrade|origin|origin-when-crossorigin|unsafe-url">
```
如果 content 属性不是合法的取值，浏览器会自动选择 no-referrer 这种最严格的策略。

3、通过a、area、link元素的 referrer属性
```
a href="http://www.baidu.com" referrer="no-referrer|origin|unsafe-url"
```