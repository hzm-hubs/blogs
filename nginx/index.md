在 Nginx 中，index 指令用于配置当客户端请求一个目录时，默认返回的文件。例如，当你访问一个目录（例如 http://example.com/）时，Nginx 会根据 index 配置寻找默认的文件并返回给客户端。

1. 基本 index 配置
最常见的 index 文件是 index.html 或 index.php，以下是一个简单的例子：

```
server {
    listen 80;
    server_name example.com;
    
    root /var/www/html;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ =404;
    }
}
```
在这个例子中：

root 指令指定了服务器的根目录为 /var/www/html。
index 指定了当访问目录时，Nginx 会尝试依次查找 index.html 或 index.htm，并将第一个存在的文件返回给客户端。
例如，访问 http://example.com/，Nginx 会寻找 /var/www/html/index.html 或 /var/www/html/index.htm 并返回其中一个文件。

2. 配置多个 index 文件
你可以配置多个 index 文件，按顺序查找。Nginx 会依次检查每个文件，找到第一个存在的文件并返回。例如：

```
index index.php index.html index.htm;
当访问一个目录时，Nginx 会先尝试查找 index.php，如果不存在则查找 index.html，如果还是不存在则查找 index.htm。
```

3. 在特定的 location 中配置 index
你可以在某个 location 块中配置特定的 index 文件。例如，如果你使用 PHP，那么你可能会为 .php 文件设置 index.php：

```
server {
    listen 80;
    server_name example.com;

    root /var/www/html;

    location / {
        index index.html;
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        index index.php;
        fastcgi_pass 127.0.0.1:9000;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```
在这个例子中：

访问 http://example.com/ 时，Nginx 会查找 index.html。
访问一个 .php 文件时，Nginx 会查找 index.php 并通过 FastCGI 传递给 PHP 解释器。
4. 处理目录请求时重定向到 index 文件
有时你可能希望当请求一个目录时，自动重定向到某个 index 文件。例如，如果访问 http://example.com/，你希望它重定向到 http://example.com/index.html：

```
server {
    listen 80;
    server_name example.com;

    root /var/www/html;
    
    location / {
        if ($request_uri ~* /$) {
            return 301 $scheme://$host/index.html;
        }
    }
}
```
在这个例子中，如果请求一个以 / 结尾的目录，Nginx 会将请求重定向到 /index.html。

5. 禁用目录中的 index 文件
如果你不想让 Nginx 自动查找 index 文件，可以设置 index 为空：

```
server {
    listen 80;
    server_name example.com;

    root /var/www/html;
    
    index  '';  # 禁用 index 文件查找

    location / {
        try_files $uri $uri/ =404;
    }
}
```
在这种情况下，Nginx 不会在目录中查找 index 文件，并且如果没有文件匹配，它将返回 404 错误。

总结

index 指令用于指定当访问目录时默认返回的文件。

你可以指定多个 index 文件，Nginx 会按顺序查找。

index 文件可以根据不同的 location 块进行配置，例如为 PHP 文件指定 index.php。

如果不希望 Nginx查找 index 文件，可以通过设置 index 为 '' 来禁用。

你还可以配置 Nginx 自动重定向到指定的 index 文件。

通过合理的 index 配置，你可以灵活控制目录请求的行为。