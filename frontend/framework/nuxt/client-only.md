当前插件中涉及window下属性或者语法，服务端渲染无法解析报错，需要换到客户端的方式引入
solution：

plugins/vue-agile.js
```
import Vue from 'vue'
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
```

nuxt.config.js
```
export default {
    plugins: ['~/plugins/vue-agile', mode: 'client']
}
```
To use component without SSR use the client-only component:
```
<client-only placeholder="Loading...">
    <agile>...</agile>
</client-only>
```