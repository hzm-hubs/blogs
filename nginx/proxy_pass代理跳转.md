前端页面 140.210.90.44:5000/vip-manager-fe/……，页面中请求后端接口 140.210.90.44:8000/customervip……接口会提示跨域 “CORS error”

![cors-error](./images/cors-error.png)

解决：在nginx做后端接口地址代理。前端还是5000去触发，由nginx代理到8000端口
```
{
    listen 5000;
    charset utf-8;
    server_name localhost;
    ……………………
    location /customervip {
        proxy_pass http://140.210.90.44:8000/customervip;
    }
}
```
在 Nginx 中，proxy_pass 是用于代理请求的指令。当你使用 proxy_pass 将请求代理到另一个服务器时，默认情况下，请求路径会被传递给目标服务器，但是其行为也可以根据配置的不同发生变化。

### proxy_pass 的行为
1. 基本路径传递(存在尾斜杠)
假设你有以下 Nginx 配置：
```
location /api/ {
    proxy_pass http://backend/;
}
```
当你访问 http://your-nginx-server/api/users 时，Nginx 会将请求代理到 http://backend/users，并去除了 /api/ 前缀。这是因为 Nginx 的 proxy_pass 默认情况下会根据 location 块中的路径匹配部分进行去除。

2. 保留匹配路径（没有尾斜杠）
如果你想将路径保持不变而传递到目标服务器，你可以使用不带尾随斜杠的 proxy_pass：
```
location /api/ {
    proxy_pass http://backend;
}
```
在这个例子中，Nginx 将会代理请求到 http://backend/api/users，即保持了 /api/ 路径不变。访问 http://your-nginx-server/api/users 会代理到 http://backend/api/users。


3. 使用 rewrite 去掉路径的配置  
如果你希望完全忽略路径，而直接将请求发送到目标地址，可以使用：
```
location /api/ {
    proxy_pass http://backend;
    rewrite ^/api(.*) $1 break;
}
```
这会将 /api 的路径部分去掉，并将请求的余下部分代理（$1）到目标服务器。例如，访问 http://your-nginx-server/api/users 会被重写为 http://backend/users， 类似第 proxy_pass 带斜杠的情况。

rewrite 后缀参数情况：
|**Flag**|**描述**|
|--|--|
|last|	停止处理当前 rewrite 规则，用新 URI 重新匹配 location|
|break|	停止处理当前 rewrite 规则，继续处理后续非 rewrite 指令|
|redirect|	返回 302 临时重定向（如果 replacement 不以 http:// 或 https:// 开头）|
|permanent|	返回 301 永久重定向|


总结

带斜杠的 proxy_pass：默认会去掉 location 中的匹配路径。

不带斜杠的 proxy_pass：会保留原始的路径传递到目标服务器。

你可以使用 `rewrite` 指令来自定义路径的处理逻辑，控制传递路径的方式。

路径的传递行为取决于 proxy_pass 的配置方式，所以在配置时要根据需要决定是否保留路径、去掉路径前缀或自定义处理路径。

|**location 路径结尾**|**proxy_pass 目标结尾**|**代理行为**|**示例请求（请求 /api/user）**｜
|--|--|--|--|
|有/|有/|去除 location 匹配部分，将剩余路径拼接到 proxy_pass |http://backend/user|
|有/|无/|将完整原始路径（包括 location 匹配部分）追加到 proxy_pass 后 |http://backend/api/user|
|无/|有/|将 location 匹配后的剩余路径拼接到 proxy_pass，但可能产生双斜杠 |http://backend//user（需用 rewrite 修正）|
|无/|无/|将完整原始路径追加到 proxy_pass 后，可能造成路径错误 |http://backendapi/user（错误拼接，可以后端兼容）|



### 常见的一些 proxy_*配置

|**配置项**|**做用说明**|**常用场景/建议**|
|--|--|--|
|proxy_pass|	设置后端服务地址（协议+主机+端口+路径）|	必须|
|proxy_set_header|设置转发到后端时的请求头（如 Host、X-Real-IP、X-Forwarded-For）|	建议加|
|proxy_redirect|	控制/修改后端返回的 Location 头，默认会自动替换主机名	|建议加 off，除非有特殊需求|
|proxy_read_timeout	|设置后端响应超时时间（秒）|	长轮询、SSE、慢接口建议加大|
|proxy_connect_timeout|	设置与后端建立连接的超时时间（秒）|	建议加|
|proxy_send_timeout|	设置向后端发送请求的超时时间（秒）	|建议加|
|proxy_buffering|	是否启用响应缓冲，默认 on	|SSE/流式接口建议 off|
|proxy_buffers|	设置缓冲区数量和大小	|大响应体时可调整|
|proxy_buffer_size|	设置用于读取响应头的缓冲区大小	|大响应头时可调整|
|proxy_set_body|	设置请求体内容	|特殊场景|
|proxy_cookie_path/domain|	修改后端返回的 Set-Cookie 路径/域名	|跨域/多域名场景|
|proxy_http_version|	设置与后端通信的 HTTP 版本	|SSE/WebSocket 建议 1.1|
|proxy_request_buffering|	控制请求体是否缓冲	|上传大文件建议 off|
|proxy_intercept_errors|	是否拦截后端错误响应（如 502/504），并用自定义错误页替换	|需要自定义错误页时|



组合使用 
```ng
location /api/ {
    proxy_pass http://backend_host:port/api/;
    proxy_set_header Host $host; // 让后端能获取到原始 Host。
    proxy_set_header X-Real-IP $remote_addr; 让后端能获取到真实客户端。
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_redirect off; // 防止后端 Location 头被 Nginx 自动替换，进入重定向，导致前台请求响应错误。

    proxy_connect_timeout 60s;
    proxy_read_timeout 120s;
    proxy_send_timeout 60s; // 根据后端接口响应速度调整，避免 Nginx 过早断开连接

    proxy_cookie_path $uri /some$uri; // 如果后端 Set-Cookie 域名/路径和前端不一致时需要用 proxy_cookie_domain、proxy_cookie_path

    proxy_buffering off;  # 适合 Server-Sent Events（SSE）、WebSocket、流式接口
    # proxy_buffers 8 16k;
    # proxy_buffer_size 32k;
}
```

[官方文档](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass)