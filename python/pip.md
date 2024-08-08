### pip ：python的包管理工具

pip是一个以 Python计算机程序语言 写成的 软件包管理系统 ，他可以安装和管理 软件包 （ https://pypi.org/ ） 中找到。，另外不少的软件包也可以在“Python软件包索引”（英语：Python Package Index，PyPI）中找到。

许多Python的发行版中已经预装了pip （Python 2.7.9 + 或 Python 3.4+ 以上版本都自带 pip 工具。 ， 没有则需要自己安装了）。

查看是否已经安装 pip 可以使用以下命令：
```
pip --version
```

下载安装包使用以下命令：
```
pip install some-package-name
# 指定包版本安装
pip install package_name==version
```
例如我们安装 numpy 包：
```
pip install numpy
# 指定包版本安装
pip install requests==2.24.0
```

我们也可以轻易地通过以下的命令来移除软件包：
```
pip uninstall some-package-name
```
例如我们移除 numpy 包：
```
pip uninstall numpy
```

如果要查看我们已经安装的软件包，可以使用以下命令：
```
pip list
```

pip 更新插件
```
pip install --upgrade package-name

# 升级pip例外
python3 -m pip install --upgrade pip

# 若使用 pip install --upgrade pip 导致 pip 丢失使用如下命令找回
python -m ensurepip
# 再使用
python3 -m pip install --upgrade pip
```

```
# 搜索包
pip search package_name

# 显示包
pip show package_name
```

安装包临时指定镜像源
```
pip install package_name -i https://mirrors.aliyun.com/pypi/simple/
```

设置镜像源
```
pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/
```

#### 导出当前 Python 环境的配置
要导出当前 Python 环境的配置，你可以使用 pip freeze 命令。
pip freeze 命令会列出当前环境中已安装的所有 Python 包及其版本信息，你可以将其保存到文件中，例如 requirements.txt，如下所示：
```
pip freeze > requirements.txt
```
以上命令将在当前目录下创建一个名为 requirements.txt 的文件，其中包含当前环境中已安装的所有包及其版本信息。然后，你可以在其他地方使用该文件来重新创建相同的环境，运行以下命令：
```
pip install -r requirements.txt
```
以上命令会根据 requirements.txt 中列出的包及其版本信息重新安装所有必需的包，从而重建相同的环境。