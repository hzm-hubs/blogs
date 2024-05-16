npm run build

echo 'build 成功'

tar zcf dist.tar.gz dist

echo '压缩成功'

scp -P 1222 dist.tar.gz bonc@10.131.129.2:/data01/data3/front

echo '代码包上传成功'

ssh bonc@10.131.129.2 -p 1222 "cd /data01/data3/front && tar xvf dist.tar.gz dist && mv dist.tar.gz dist-back.tar.gz"

# $? 获取上一步指令执行结果 0 表示成功
if [ $? -eq 0 ]; then
    echo "更新成功"
else
    echo "更新失败：$?"
fi
