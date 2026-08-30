### 默认可以 postgres 用户名进入 psql
```
# 查看版本号
psql -V 
# 使用数据库超级管理员 postgres 身份进入
sudo -u postgres psql 
```


### 安装位置查看
```
操作系统/安装方式	       配置文件路径
Ubuntu/Debian (apt)	    /etc/postgresql/<版本号>/main/postgresql.conf
CentOS/RHEL (yum/dnf)	/var/lib/pgsql/<版本号>/data/postgresql.conf
Docker 容器	             /var/lib/postgresql/data/postgresql.conf
源码编译安装	          $PGDATA/postgresql.conf
```

### 修改 listen_addresses
```
vim postgresql.conf
```

### 找到 listen_addresses 这一行，通常它被注释掉了（开头有 #）。修改为：
```
# 修改前（默认）：
# listen_addresses = 'localhost'

# 修改后（监听所有地址）：
listen_addresses = '*'
```

### 重启 psql 服务
```
# 方法1：使用 systemctl（推荐）
sudo systemctl restart postgresql

# 方法2：使用 pg_ctl（如果 systemctl 不可用）
sudo -u postgres pg_ctl restart -D /var/lib/postgresql/14/main/

# 方法3：使用 service 命令
sudo service postgresql restart
```

### 查看服务启动文件
```
systemctl list-unit-files | grep postgres

输出结果如下
postgresql-18.service

再重启服务
sudo systemctl restart postgresql-18

查看服务状态
sudo systemctl status postgresql-18
```

### 验证监听端口
```
sudo ss -tunlp | grep 5432
```

### 查看防火墙策略
```
# 查看当前生效的规则 (对于 CentOS/RHEL（使用 firewalld）：)
sudo firewall-cmd --list-all

# 如果有限制 5432 则放行
sudo firewall-cmd --permanent --add-port=5432/tcp
sudo firewall-cmd --reload

#对于 Ubuntu/Debian（使用 ufw）：
sudo ufw status

#如果有限制 5432则放行
sudo ufw allow 5432/tcp
```

### 本机验证
```
telnet ip port
# 如果还不行请检查服务器示例安全组配置
```