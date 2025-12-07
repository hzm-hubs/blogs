参考：https://cloud.tencent.com/developer/article/1751022

▌查看端口占用情况
```
netstat -an | grep 8080

lsof -i:8080
```
区别：

netstat：用于显示各种网络相关信息，如网络连接，路由表，接口状态
```
netstat -a (all)显示所有选项，默认不显示LISTEN相关
netstat -t (tcp)仅显示tcp相关选项
netstat -u (udp)仅显示udp相关选项
netstat -n 拒绝显示别名，能显示数字的全部转化成数字。
netstat -l 仅列出有在 Listen (监听) 的服務状态
netstat -p 显示建立相关链接的程序名
netstat -r 显示路由信息，路由表
netstat -e 显示扩展信息，例如uid等
netstat -s 按各个协议进行统计
netstat -c 每隔一个固定时间，执行该netstat命令。
```
常用 
```
netstat -tunlep // 查看电脑端口号

netstat -tunlp | grep 4510 // 查看4510端口号情况
```
losf：（列出打开文件lists openfiles）能看到pid和用户(有权限控制，只能看到本用户)，可以找到哪个进程占用了这个端口
(可能需要自己安装命令)
```
lsof `which httpd` //那个进程在使用apache的可执行文件
lsof /etc/passwd //那个进程在占用/etc/passwd
lsof /dev/hda6 //那个进程在占用hda6
lsof /dev/cdrom //那个进程在占用光驱
lsof -c sendmail //查看sendmail进程的文件使用情况
lsof -c courier -u ^zahn //显示出那些文件被以courier打头的进程打开，但是并不属于用户zahn
lsof -p 30297 //显示那些文件被pid为30297的进程打开
lsof -D /tmp 显示所有在/tmp文件夹中打开的instance和文件的进程。但是symbol文件并不在列
lsof -u1000 //查看uid是100的用户的进程的文件使用情况
lsof -utony //查看用户tony的进程的文件使用情况
lsof -u^tony //查看不是用户tony的进程的文件使用情况(^是取反的意思)
lsof -i //显示所有打开的端口
lsof -i:80 //显示所有打开80端口的进程
lsof -i -U //显示所有打开的端口和UNIX domain文件
lsof -i UDP@[url]www.akadia.com:123 //显示那些进程打开了到www.akadia.com的UDP的123(ntp)端口的链接
lsof -i tcp@ohaha.ks.edu.tw:ftp -r //不断查看目前ftp连接的情况(-r，lsof会永远不断的执行，直到收到中断信号,+r，lsof会一直执行，直到没有档案被显示,缺省是15s刷新)
lsof -i tcp@ohaha.ks.edu.tw:ftp -n //lsof -n 不将IP转换为hostname，缺省是不加上-n参数
```
▌显示瞬间进程的状态

ps ：（process）查看有终端控制的所有进程
```
ps -ef | grep word  查看包含关键字word的所有外部进程（包括其他用户）
ps -ax 使用 -a 参数。-a 代表 all。同时加上x参数会显示没有控制终端的进程
```

▌显示实时进程的状态

top