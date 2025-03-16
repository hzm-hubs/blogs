在 Nginx 中配置负载均衡（Load Balancing）主要用于将客户端请求分发到多个后端服务器（上游服务器），以实现负载分担和高可用性。以下是负载均衡的详细配置方法和策略：

```
http {
    upstream backend {
        server backend1.example.com;  # 第一台后端服务器
        server backend2.example.com;  # 第二台后端服务器
        server backend3.example.com;  # 第三台后端服务器
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
        }
    }
}
```

可以配置权重，分配请求比例
```
upstream backend {
    server backend1.example.com weight=3;  # 分配 3 份流量
    server backend2.example.com weight=1;  # 分配 1 份流量
    server backend3.example.com weight=1;  # 分配 1 份流量
}
```