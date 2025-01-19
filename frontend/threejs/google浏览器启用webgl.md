### 1.检测webgl是否可用
在 https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/By_example/Detect_WebGL 页面检查当前是否可用

### 2.启用 WebGL 设置

确保 WebGL 功能在 Chrome 中是启用的：

1）打开 Chrome 的设置： 在地址栏中输入 chrome://settings/。

2）搜索 Hardware Acceleration：

确保 Use hardware acceleration when available（使用图形加速功能（如果可用）） 已启用。
如果未启用，请勾选并重新启动浏览器。

3）检查 WebGL 相关标志：

在地址栏中输入 chrome://flags/。

搜索 WebGL，确保以下选项是启用的：
- WebGL Draft Extensions：启用草稿扩展（根据需求）。
- WebGL 2.0 Compute：启用 WebGL 2.0 计算支持（可选）。