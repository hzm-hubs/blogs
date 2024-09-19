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