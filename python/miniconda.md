Miniconda 是一个免费的、微型的 Anaconda Distribution 安装包，仅包含 conda、Python、它们都依赖的包以及少量其他有用的包。

### 一、环境管理（最常用）
```bash
conda activate <env_name>          # 激活指定环境
conda deactivate                   # 退出当前环境
conda create -n <env_name> python=3.x   # 创建新环境（可指定Python版本）
conda env list                     # 查看所有环境列表（等价于 conda info -e）
conda info -e                      # 查看所有环境列表（简写形式）
conda remove -n <env_name> --all   # 删除整个环境
conda rename -n <old> <new>        # 重命名环境（需先退出该环境）
conda clone -n <old> -n <new>      # 克隆现有环境
```
### 二、包管理（高频操作）
```bash
conda install <package>            # 在当前环境安装包
conda install -n <env> <package>   # 安装到指定环境
conda uninstall <package>          # 卸载包
conda list                         # 查看当前环境已安装的包列表
conda list -n <env>                # 查看指定环境的包列表
conda update <package>             # 更新指定包
conda update --all                 # 更新当前环境所有包
conda search <package>             # 搜索可用包版本
```
### 三、环境导出与复制（团队协作必备）
```bash
conda env export > environment.yml           # 导出当前环境（含精确版本号）
conda env export --no-builds > environment.yml   # 导出（跨平台友好，不含build号）
conda env create -f environment.yml          # 从 yml 文件创建环境
conda list --explicit > spec-file.txt        # 导出显式版本列表
conda create -n <new> --file spec-file.txt   # 从显式文件创建环境
```
### 四、渠道（Channel）管理
```bash
conda config --add channels <url>        # 添加镜像源（如 conda-forge）
conda config --remove channels <url>     # 移除渠道
conda config --show channels             # 查看当前配置的渠道列表
conda config --set channel_priority strict   # 设置渠道优先级为严格模式
```
### 五、Conda 自身管理
```bash
conda --version          # 查看 conda 版本
conda update conda       # 更新 conda 本身
conda info               # 查看当前环境信息（路径、版本、渠道等）
```
### 六、清理与维护
```bash
conda clean --all        # 清理缓存和未使用的包（释放磁盘空间）
conda clean -p           # 只清理未使用的包
conda clean -t           # 只清理 tar 包缓存
```
### 七、新手必看：配置国内镜像源（清华源）
新装 Miniconda 后第一件事，否则下载慢到崩溃：
```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --set show_channel_urls yes
```
### 八、实用小贴士
|**场景**|**建议**|
|--|--|
|跨平台共享环境|	导出时使用 --no-builds 选项，避免系统差异导致冲突|
|记不住命令参数|	直接敲 conda create --help 或 conda install --help，比搜网页快|
|环境炸了想重来|	conda remove -n <env> --all 删掉重建，比修修补补省时间|
|磁盘空间不足|	定期执行 conda clean --all，通常能释放几个 GB|
