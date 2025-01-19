### 1.先在js文件中对axios做一些处理再引入到vue文件中，比如请求拦截、响应拦截、封装统一的get、post方法，甚至是定义接口请求。

- 安装
`npm i axios`
- 扩展
```js
// axios.js
import axios from 'axios'

axios.defaults.timeout = 50000

axios.interceptors.request.use(config => {
  // ...
  return config
}, error => {
  return Promise.error(error)
})

export default axios
```
- 接口文件中声明
``` js
import axios from axios
// api.js
export const getName = (params) => {
    return axios.get(`xx/xx/${params}`)
}
```
- 页面中使用
```vue
<script lang="ts" setup>
import {getName} from '~@/requests/index'
onMounted(() => {
  getName('xxxx');
});
</script>
```

### 2.将axios挂载到全局变量上，可供页面直接调用

- 安装
`npm i axios`
- 挂载
```
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
onMounted(() => {
  console.log(appContext.config.globalProperties.axios)
})
```
- 使用
```
import { getCurrentInstance } from 'vue'
const { appContext } = getCurrentInstance();
onMounted(() => {
  console.log(appContext.config.globalProperties.axios)
})
```

### 使用 vue-axios
这种方法可以用vue.use()安装axios，然后通过provide-inject使用。
- 安装
`npm install --save axios vue-axios`
- 挂载
```
import axios from 'axios'
import VueAxios from 'vue-axios'

const app = createApp(App).use(store)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
```
- 使用
```
import { inject } from 'vue'
const axios = inject('axios')
console.log(axios)
```