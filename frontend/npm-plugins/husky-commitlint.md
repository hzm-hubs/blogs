type用于说明 commit 的类型，被指定在 commitlint.config.js 的 type-enum 如下：
```
feat     ：新功能（feature）

fix      ：修补bug

docs     ：文档

style    ：格式（不影响代码运行的变动）

refactor ：重构（即不是新增功能，也不是修改bug的代码变动）

test     ：增加测试

chore    ：构建过程或辅助工具的变动

revert   : 回滚到上一个版本
```
// 举例
git commit -m "feat: 举例"    