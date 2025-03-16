在 Linux 系统中，service 命令通常用于启动、停止、重启和查看服务的状态。虽然现代的 Linux 发行版使用 systemd 和 systemctl 来管理服务，但许多系统（特别是旧的系统或那些不使用 systemd 的系统）依然使用 service 命令。

下面是一些常用的 service 命令及其用法：

1. 启动服务
```
// 使用 service 命令启动某个服务。
service <service_name> start

//例如，启动 nginx 服务：
service nginx start
```
2. 停止服务
```
//使用 service 命令停止正在运行的服务。
service <service_name> stop

//例如，停止 nginx 服务：
service nginx stop
```
3. 重启服务
```
// 使用 service 命令重启某个服务，通常用于重新加载配置文件后使新设置生效。
service <service_name> restart

//例如，重启 nginx 服务：
service nginx restart
```

4. 重新加载服务（不重启）
```
// 如果服务支持，你可以使用 reload 来重新加载配置文件，而不需要完全停止和重启服务。
service <service_name> reload

// 例如，重新加载 nginx 服务配置：
service nginx reload
```
5. 查看服务状态
```
// 使用 status 参数查看服务当前的运行状态。
service <service_name> status

// 例如，查看 nginx 服务的状态：
service nginx status
```
这将输出该服务的当前状态，告诉你它是否正在运行，或者有任何错误日志。

6. 开启服务开机启动

使用 chkconfig 命令来配置服务是否随系统启动而启动（这不是 service 命令的本身功能，但在一些系统中与 service 命令一起使用）。
```
chkconfig <service_name> on

//例如，设置 nginx 服务开机启动：
chkconfig nginx on
```

7. 禁用服务开机启动
```
// 关闭某个服务的开机启动。
chkconfig <service_name> off

// 例如，禁用 nginx 服务开机启动：
chkconfig nginx off
```
8. 启动所有服务

启动所有已配置的服务（只对某些发行版有效）。

`service --status-all`

该命令会列出所有服务，并显示它们的当前状态（启动、停止或未运行）。

9. 查看所有已启动的服务

使用 service --status-all 来查看所有的服务以及它们的当前状态。

`service --status-all`

这将列出所有服务，并显示每个服务的当前状态，通常会看到一个 + 或 - 标志来表示服务是运行中的或停止的。

10.  管理自定义服务

你可以为自定义服务创建启动脚本并通过 service 管理它们。这要求你将自定义服务脚本放到 /etc/init.d/ 目录下，并为其设置适当的权限。

自定义服务脚本例子（例如自定义的 myapp 服务）：

在 /etc/init.d/ 目录下创建一个脚本 myapp，并为它设置执行权限：
```
sudo touch /etc/init.d/myapp
sudo chmod +x /etc/init.d/myapp
```
在该脚本中，你可以定义启动、停止、重启等操作：
```
#!/bin/bash
case "$1" in
    start)
        echo "Starting MyApp"
        # 启动命令
        ;;
    stop)
        echo "Stopping MyApp"
        # 停止命令
        ;;
    restart)
        echo "Restarting MyApp"
        # 重启命令
        ;;
    *)
        echo "Usage: $0 {start|stop|restart}"
        exit 1
esac
```
保存并退出后，你可以通过以下命令来管理你的自定义服务：
```
service myapp start
service myapp stop
service myapp restart
```

总结

service 命令用于管理基于 init.d 的服务，适用于旧版的 Linux 系统或不使用 systemd 的系统。

常用命令：

start：启动服务

stop：停止服务

restart：重启服务

reload：重新加载服务配置（不重启）

status：查看服务的状态

chkconfig：管理服务的开机启动（适用于某些发行版）

对于现代的 Linux 系统，建议使用 systemctl 来管理服务，尤其是在使用 systemd 的系统中。如果你的系统依然使用 init.d 或不支持 systemd，service 命令是管理服务的好工具