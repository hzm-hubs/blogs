### __dirname

- 返回当前模块的目录名

当前模块的目录名。 这与 __filename 的 path.dirname() 相同。

```js
console.log(__dirname);
// 打印: /Users/mjr
console.log(path.dirname(__filename));
// 打印: /Users/mjr
```

### __filename

返回当前模块的文件名。注意这是当前模块文件的已解析符号链接的绝对路径
