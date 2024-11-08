### missing semi-colon or unrecognised media features on import


注意：@import "${path.resolve(__dirname, 'src/assets/css/global.less')}";中的`""`和结尾处的`;`不能省略，否则会报错：# missing semi-colon or unrecognised media features on import

// `less-loader`4版本及以上是使用`additionalData`，而非旧版的`modifyVars`

```js
    css: {
        preprocessorOptions: {
            less: {
                // globalVars: {
                //     blue: "#1CC0FF",
                // },
                javascriptEnabled: true,
                additionalData: `@import "@/assets/styles/common.less";`,
                // additionalData: `@import "${pathResolve(
                //     "src/assets/styles/common.less",
                // )}";`,
            },
        },
    },
```

可以认为是在为每个 less 文件预先引入了 
<code>
@import url(@/assets/styles/common.less);
</code>
