<nuxt-child> 组件用于显示嵌套路由场景下的页面内容。
例如：
```
-| pages/
---| parent/
------| child.vue
---| parent.vue
```

上面的目录树结构会生成下面这些路由配置：

```
[
  {
    path: '/parent',
    component: '~/pages/parent.vue',
    name: 'parent',
    children: [
      {
        path: 'child',
        component: '~/pages/parent/child.vue',
        name: 'parent-child'
      }
    ]
  }
]
```

为了显示 child.vue 组件，我们需要在父级页面组件 pages/parent.vue 中加入 <nuxt-child/>：
```
<template>
  <div>
    <h1>我是父级页面</h1>
    <nuxt-child :foobar="123" />
  </div>
</template>

子组件可以通过属性方式获取到父页面传递的foobar值
props{
    foodbar:{
        default: ''    
    }
}
```
<nuxt-child/> 接收 keep-alive 和 keep-alive-props:
```
<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<!-- 将被转换成以下形式 -->
<div>
  <keep-alive :exclude="['modal']">
    <router-view />
  </keep-alive>
</div>
```
子组件还可以接收 Vue 组件等属性。
可以看这个实际案例：嵌套路由示例

命名视图

Nuxt v2.4.0 新增

<nuxt-child/>接受name prop 来呈现渲染命名视图：
```
<template>
  <div>
    <nuxt-child name="top" />
    <nuxt-child />
  </div>
</template>
```