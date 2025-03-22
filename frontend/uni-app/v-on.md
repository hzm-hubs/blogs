小程序中有一些 组件的触发方法是带 bind
如 筛选框组件的取消按钮回调方法是绑定在 bindcancel 的
```
<picker bindcancel="handleCancel"></picker>
```
刚开始还有点懵后来想到 vue 中的有个类似的 v-bind 可用于绑定组件指令或者属性等，于是想着可以将 bindcancel 换做 @cancel 尝试
```
<picker @cancel="handleCancel"></picker>
```
哈哈哈，成功！可以使用@标识同理可以通过 v-on：指令触发
```
<picker v-on:cancel="handleCancel"></picker>
```
