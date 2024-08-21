* echo用于字符串的输出
```
# 语法格式
echo string

# 转译字符输出
echo "\"It is a test\""

# 显示变量
count = 1
echo "current value is $count"

# 也支持换行符
echo "It is a \n test"

# 显示不换行
echo "It is a \c test"

# 将内容覆盖目标文件
echo "It is a test" > myfile

# 将内容写入目标文件
echo "It is a test" >> myfile

# 原样输出字符串，不进行转义或取变量(用单引号)
echo '$name\"'
$name\"

# 显示命令执行结果
echo `date`
Thu Jul 24 10:08:46 CST 2014
```