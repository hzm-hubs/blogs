nginx 中 location 模块下不能写 ws 协议，但是可以配置请求升级，从而支持websocket通信

```

http {
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }
 
    server {
        listen 80;
 
        location /ws {
            proxy_pass http://websocket_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
        }
    }
}
```