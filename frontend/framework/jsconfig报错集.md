### jsconfig.json文件提示 找不到“minimatch”的类型定义文件。程序包含该文件是因为: 隐式类型库 "minimatch" 的入口点

编辑器的 typeScript 语言服务会尝试为项目中使用的 javaScript 库自动获取类型定义，这称为自动类型获取（Type Acquisition）。当它发现你使用了minimatch库，但找不到对应的类型定义时，就会给出这个提示。

解决方案

- 安装 @types/minimatch 依赖

`npm install --save-dev @types/minimatch`

安装完成后，重启编辑器或重启TypeScript语言服务

- 配置jsconfig.json忽略该库的类型获取
  
```json
{
  "compilerOptions": {
    // ... 你已有的其他配置
  },
  "typeAcquisition": {
    "exclude": ["minimatch"]
  },
  "include": [
    // ... 你已有的include配置
  ]
}
```
- 重启 typeScript 语言服务
  - 在编辑器中，如 VSCode 按下 Ctrl+Shift+P（Windows/Linux）或 Cmd+Shift+P（Mac）打开命令面板。

  - 输入命令 TypeScript: Restart TS Server 并执行。

  - 观察错误提示是否消失。