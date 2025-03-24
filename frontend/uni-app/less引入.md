### less 引入

vue模版下的文件是放在 src 目录下的，所以引用是使用 @ 起头

如果目标less文件所在目录：src/static/less/index.less，可以如下引入
```
<style lang="less" scoped>
@import '@/static/less/index.less';
</style>
```

也可以通过安装less、less-loader插件，然后在配置文件中：

```
module.exports = {
	css: {
		loaderOptions: {
			less: {
				// 4以前版本是使用modifyVars:{}
				additionalData: `@import url("@/styles/index.less");`,
			},
		},
	},
};

```