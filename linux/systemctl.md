systemctl 是一个用于 管理 Linux 系统中的 systemd 服务管理器 的命令行工具。systemd 是大多数现代 Linux 发行版（如 Ubuntu、CentOS、Debian、Fedora 等）默认的系统和服务管理工具，它负责启动和管理操作系统的各个服务（或叫守护进程），包括网络、硬件、后台任务等。

systemctl 命令用于与 systemd 进行交互，可以启动、停止、重启服务，查看服务的状态，启用/禁用服务，查看系统日志等。

常用的 systemctl 命令

1. 查看服务的状态：

```
// 查看服务是否在运行：
systemctl status <service_name>
 
// 例如，查看 nginx 服务的状态：
systemctl status nginx
```

2. 启动服务：
```
// 启动某个服务：
systemctl start <service_name>

// 例如，启动 nginx 服务：
systemctl start nginx
```
3. 停止服务：
```
// 停止某个服务：
systemctl stop <service_name>

// 例如，停止 nginx 服务：
systemctl stop nginx
```

4. 重启服务：
```
// 重启某个服务：
systemctl restart <service_name>

// 例如，重启 nginx 服务：
systemctl restart nginx
```

5. 重新加载服务配置：
```
// 如果修改了服务配置文件，想要重新加载而不重启服务，可以使用：
systemctl reload <service_name>

// 例如，重新加载 nginx 服务的配置：
systemctl reload nginx
```

6. 启用服务（开机启动）：
```
// 设置服务在系统启动时自动启动：
systemctl enable <service_name>

// 例如，设置 nginx 服务开机启动：
systemctl enable nginx
```

7. 禁用服务（禁止开机启动）：

```
// 禁止服务在系统启动时自动启动：
systemctl disable <service_name>

// 例如，禁用 nginx 服务开机启动：
systemctl disable nginx
```

8. 查看所有服务的状态：

```
// 查看所有正在运行的服务：
systemctl list-units --type=service
```

9. 查看系统的启动日志：

```
// 查看 systemd 启动日志，帮助排查启动过程中可能出现的问题：
journalctl -xe
```
10. 查看日志（过滤）：
```
// 查看某个特定服务的日志：
journalctl -u <service_name>

//例如，查看 nginx 服务的日志：
journalctl -u nginx
```

systemctl 是 systemd 的一部分，它取代了较老的 service 命令，并提供了更多的功能和控制选项。例如，systemctl 还可以处理日志、服务依赖关系、目标状态等。