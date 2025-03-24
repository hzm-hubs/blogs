参考链接：https://uniapp.dcloud.net.cn/collocation/pages.html#easycom

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。easycom将其精简为一步。只要组件路径符合规范（具体见下），就可以不用引用、注册，直接在页面中使用。如下：

```js
<template>
    <view class="container">
        <comp-a></comp-a>
        <uni-list>
        </uni-list>
    </view>
</template>
<script>
    // 这里不用import引入，也不需要在components内注册uni-list组件。template里就可以直接用
    export default {
    data() {
        return {}
    }
    }
</script>
```
路径规范指：

1.安装在项目根目录的components目录下，并符合components/组件名称/组件名称.vue

2.安装在uni_modules下，路径为uni_modules/插件ID/components/组件名称/组件名称.vue

如果提示未找到组件，如 `“Component PartList is not found (by using /home/home)” ` , 可能是由于组件 PartList 在自定义文件夹创建，引入后并没有自动导入依赖包，可尝试重新启动