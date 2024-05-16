#!/bin/bash

# 也可以用 sed 命令来读取文件
# 比如
# config=`sed -n '1p' config/index.ts |awk -F '= ' '{print $2}'`
# version=${config:1:4}

# source（或 .）命令来加载文件中的变量，或者使用 grep、awk 等命令来解析和读取文件内容。
source ./constants.sh

# 将日期时间按格式赋值给变量：
curDate=$(date +'%m-%d')

# 进行比较
if [ $curDate == $lastModified ]; then
    count=$(expr $count + 1)
else
    count=1
fi

echo $curDate

echo $count

echo "count=$count\nlastModified='$curDate'" >./constants.sh
