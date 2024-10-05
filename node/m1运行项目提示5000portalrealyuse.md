本地启动 5000 端口的项目提示端口号被占用 ，下方是终端打印
```
Error: listen EADDRINUSE: address already in use 0.0.0.0:5000
    at Server.setupListenHandle [as _listen2] (node:net:1334:16)
    at listenInCluster (node:net:1382:12)
    at doListen (node:net:1520:7)
    at processTicksAndRejections (node:internal/process/task_queues:84:21)
[nodemon] app crashed - waiting for file changes before starting...
```
使用 sudo lsof -i:5000 查询当前占用5000端口号的命令 ，看到 ControlCe 控制中心正在使用
```
sudo lsof -i:5000

// 输出
COMMAND     PID        USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ControlCe 74824 huangliuliu   22u  IPv4 0x7c5e0b2f52d5d885      0t0  TCP *:commplex-main (LISTEN)
ControlCe 74824 huangliuliu   23u  IPv6 0x7c5e0b2f5891106d      0t0  TCP *:commplex-main (LISTEN)
```
查看活动监视器中心
![alt text](portuse.png)
尝试更换端口启动项目
```
//清楚个别进程
sudo kill -9 {PID}

//清除所有node进程 
sudo killall -9 node
```
