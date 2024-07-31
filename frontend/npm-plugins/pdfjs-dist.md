1.在vue3项目中引入使用

```
import pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
```

页面显示错误，控制台有报错：SyntaxError: The requested module '/node_modules/.vite/deps/pdfjs-dist_build_pdf.js?v=5a3342e7' does not provide an export named 'default' (at PdfPreview.vue:3:1)

当按照网上所说，使用await导入
```
const pdfjs = await import("pdfjs-dist/build/pdf")
```
页面显示正常，但会影响 onMounted 生命钩子函数且会预览失败，查阅资料是因为vite不支持顶级的 async/await 语法，需要安装插件使用

在 vite.config.js 中安装并引入 topLevelAwait

```
import topLevelAwait from 'vite-plugin-top-level-await' 
export default ({ mode }: any) => { 
    return defineConfig(
        { plugins: [ 
            topLevelAwait({ promiseExportName: '__tla', 
            promiseImportName: (i) => `__tla_${i}` }) 
        ],}
    ) 
}
```

在页面中通过 as 符号使用
```
import pdfjs from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker";
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
```