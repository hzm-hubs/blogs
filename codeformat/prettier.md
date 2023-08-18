# Prettier

代码格式工具，官网地址：https://www.prettier.cn

## 1 配置文件
- 项目根目录下以 JSON 或 YAML 编写的文件.prettierrc
  `.prettierrc.json`、`.prettierrc.yml`、`.prettierrc.yaml`或`.prettierrc.json5`文件
-  使用导出对象`module.exports`的js文件
  `.prettierrc.js`、`.prettierrc.cjs`、`prettier.config.js`
- `package.json` 中的 `prettier` 字段
  
## 2 `.prettierignore`
  在该文件中设置不被`prettier`检查的文件或文件夹,如：
  ```
  /node_modules
  /dist
  ```