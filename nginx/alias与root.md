### 1、root 配置：
使用 root 指令时，Nginx 会将请求的 URL 路径与指定的根目录路径进行拼接。这意味着 URL 中的路径会映射到文件系统中的对应位置。
例如，假设我们有以下配置：
```
location /static/ {
    root /var/www/;
}
```
当收到的请求是 <code>http://example.com/static/image.jpg</code> 时，Nginx 会查找文件系统中的 <code>/var/www/static/image.jpg</code>  并返回该文件。
这里需要注意的是，root 指令会将匹配的 URL 路径直接映射到文件系统中的相对路径，而不是将请求 URL 中的路径添加到指定的根目录路径后。
### 2、alias 配置：
与 root 不同，alias 指令允许我们在返回文件时，重写 URL 路径的部分或全部。这对于需要在返回文件时修改 URL 路径的情况非常有用。
例如，假设我们有以下配置：
```
location /static/ {
    alias /var/www/;
}
```
当收到的请求是 <code>http://example.com/static/image.jpg</code> 时，Nginx 会查找文件系统中的 <code>/var/www/image.jpg</code> 并返回该文件。
alias 指令会将匹配的 URL 路径替换为指定的文件系统路径。在上面的例子中，/static/ 被替换为 /var/www/，而 /image.jpg 部分保持不变。
这里需要注意的是，alias 指令需要确保文件路径的完整性，因为它会完全替换 URL 路径，而不会将请求 URL 的路径添加到指定的根目录路径后。

### root 和 alias 区别 
- root读取的是根目录，可以在 <code>server </code>或<code>location</code>指令中使用。
- alias只能在<code>location</code>指令中使用。
  
### 两者何时用？
- 如果位置与别名路径的末尾匹配，最好使用root。
- 如果从与 root 指定的目录不同的位置读取数据时，最好使用alias。
- 如果是前端静态资源项目，且设置了基础路径(如 /base )时最好也使用 alias

综上所述，root 用于直接映射 URL 路径到文件系统中的相对路径，而 alias 允许在返回文件时修改 URL 路径的部分或全部。选择使用哪种方式取决于具体的需求。