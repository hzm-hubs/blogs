pm2 提示 You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:

```
WARN  No pages directory found in /data01/app/h5-test-purchase/prod. Using the default built-in page.

You have triggered an unhandledRejection, you may have forgotten to catch a Promise rejection:
Error: Plugin not found: /data01/app/h5-test-purchase/prod/plugins/axios.ts
at /data01/app/h5-test-purchase/prod/node_modules/@nuxt/builder/dist/builder.js:6031:15
at async Promise.all (index 1)
at async Builder.build (/data01/app/h5-test-purchase/prod/node_modules/@nuxt/builder/dist/builder.js:5595:5)
at async start (/data01/app/h5-test-purchase/prod/server/index.ts:39:9)
```
查找解压文件发现项目.nuxt中缺少dist目录文件，

所以检查打包文件路径和启动方式是否正常，