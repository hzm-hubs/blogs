Ollama 是一个用于在本地运行大型语言模型（LLM）的工具，支持多种开源模型（如 Llama 3、Mistral、Gemma 等）。以下是常用的 Ollama 操作指令和示例：

### 安装与更新

安装 Ollama

访问官网下载安装：[ollama 官网](https://ollama.com/)

[ollama 文档](https://github.com/ollama/ollama/blob/main/docs/README.md)

```bash
# Linux 一键安装
curl -fsSL https://ollama.com/install.sh | sh
```

更新 Ollama

```bash
ollama pull llama3
# 拉取最新模型时会自动更新 Ollama
```

### 模型管理

拉取模型（从仓库下载）

```bash
ollama pull llama3         # 拉取默认版本
ollama pull llama3:8b-instruct-q4_0  # 指定版本/量化级别
```

查看已安装模型

```bash
ollama list
```

删除模型

```bash
ollama rm llama3
```

创建自定义模型

编辑 Modelfile 文件（例如基于 Llama 3 微调）：

```dockerfile
FROM llama3
SYSTEM "你是一个专业的助手，回答需简洁。"
```

然后运行：

```bash
ollama create my-model -f Modelfile

```

### 运行与交互

启动模型交互

```bash
ollama run llama3   # 进入对话模式
```

直接提问（单次命令）

```bash
ollama run llama3 "用一句话解释量子力学"
```

作为服务运行（启用 API）

```bash
ollama serve
```

API 默认地址：http://localhost:11434

### 高级功能

多模型切换

```bash
ollama run mistral  # 切换为 Mistral 模型
```

后台运行

```bash
ollama serve  # Linux/macOS 后台运行
```

查看日志

```bash
ollama logs
```

### 常见问题

- 模型下载慢：

尝试更换镜像源或手动下载模型文件。

- GPU 加速：

确保已安装 CUDA（NVIDIA）或 Metal（Apple），Ollama 会自动检测。

- 内存不足：

选择更小的量化版本（如 q4_0）或关闭其他程序。

### 停止服务

Linux/macOS

```bash
# 查找 Ollama 进程 ID
ps aux | grep ollama

# 终止进程（替换 <PID> 为实际进程号）
kill -9 <PID>

# 或者直接使用 pkill
pkill -f ollama
```

Windows

- 打开 任务管理器（Ctrl + Shift + Esc）
- 在 进程 标签页中找到 ollama.exe，右键选择 结束任务。

2. 如果 Ollama 作为后台服务运行
   Linux (Systemd)

```bash
# 停止服务
sudo systemctl stop ollama

# 禁用开机自启（可选）
sudo systemctl disable ollama
```

macOS (Launchd)

```bash
# 停止服务
launchctl unload ~/Library/LaunchAgents/ollama.plist
```

3. 确认服务已停止

```bash
# 检查是否仍在运行
ps aux | grep ollama  # Linux/macOS
tasklist | findstr ollama  # Windows
```

如果无输出，则表示已成功停止。
