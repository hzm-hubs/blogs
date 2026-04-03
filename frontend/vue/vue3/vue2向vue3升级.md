1. 双向绑定原理由 Object的get/set 劫持升级为  proxy（reflect 中劫持） 的代理返回，解决了页面渲染后为变量添加属性不是响应式问题

2. 编码格式由option API （data、methods、computed）转向 composition API （ref，reactive ……），逻辑分明提高了代码可读性，二是可以像react中hooks那样封装可服用的高阶组件，相比于mixin的声明导入更友好（mixin命名具有唯一性）

3. tree-shaking 按需打包体积更小，基于diff算法优化速度更快

4. vue3直接支持 typescript ，vue2还需要借助装饰器插件编写ts