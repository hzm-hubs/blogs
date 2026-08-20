# pip 常用命令速查表

## 📦 安装与卸载

| 命令 | 说明 |
|------|------|
| `pip install <包名>` | 安装最新版本的包 |
| `pip install <包名>==<版本号>` | 安装指定版本 |
| `pip install <包名>>=<最低版本>` | 安装不低于某版本的包 |
| `pip install -r requirements.txt` | 批量安装 requirements.txt 中列出的所有包 |
| `pip install --upgrade <包名>` 或 `-U` | 升级包到最新版本 |
| `pip uninstall <包名>` | 卸载包（会提示确认） |
| `pip uninstall -y <包名>` | 卸载包（跳过确认提示） |

---

## 🔍 查看与搜索

| 命令 | 说明 |
|------|------|
| `pip list` | 列出当前环境所有已安装的包 |
| `pip list --outdated` | 列出所有可升级的过时包 |
| `pip list --uptodate` | 列出所有已是最新版本的包 |
| `pip show <包名>` | 查看已安装包的详细信息（版本、依赖、位置等） |
| `pip index versions <包名>` | 查看该包在 PyPI 上的所有可用版本 |
| `pip search <关键词>` | 在 PyPI 上搜索包（注意：PyPI 已限制此功能，可能不可用） |
| `pip freeze` | 以 requirements 格式列出已安装包（常用于生成依赖文件） |

---

## 📝 依赖管理

| 命令 | 说明 |
|------|------|
| `pip freeze > requirements.txt` | 将当前环境所有包及版本导出到文件 |
| `pip install -r requirements.txt` | 从文件批量安装包 |
| `pip check` | 检查已安装包的依赖关系是否完整、有无冲突 |

---

## ⚙️ 配置与信息

| 命令 | 说明 |
|------|------|
| `pip --version` | 查看 pip 自身版本 |
| `pip show pip` | 查看 pip 自身的详细信息 |
| `pip config list` | 查看 pip 当前配置 |
| `pip config set global.index-url <镜像源>` | 设置 pip 镜像源（如换成清华源） |
| `pip help` | 查看 pip 帮助信息 |
| `pip help <子命令>` | 查看某个子命令的详细帮助，如 `pip help install` |

---

## 🧪 下载与缓存

| 命令 | 说明 |
|------|------|
| `pip download <包名>` | 下载包但不安装（可指定 `-d` 目标目录） |
| `pip cache info` | 查看 pip 缓存使用情况 |
| `pip cache purge` | 清空 pip 缓存 |

---

## 🎯 实用组合技

| 场景 | 命令组合 |
|------|----------|
| **全新环境一键安装所有依赖** | `pip install -r requirements.txt` |
| **批量升级所有过时包** | `pip list --outdated` 查看，再用 `pip install -U <包名>` 逐个升级（或用 `pip-review` 工具自动化） |
| **迁移项目依赖到新环境** | 旧环境：`pip freeze > requirements.txt` → 新环境：`pip install -r requirements.txt` |
| **解决依赖冲突** | `pip check` 检查冲突 → 手动调整版本号重新安装 |

---

## 💡 小贴士

- 如果下载速度慢，可以临时换国内镜像源，例如清华源：
  ```bash
    安装包临时指定镜像源
    pip install package_name -i https://mirrors.aliyun.com/pypi/simple/

    设置镜像源
    pip config set global.index-url https://mirrors.aliyun.com/pypi/simple/`
  ```