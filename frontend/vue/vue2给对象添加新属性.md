在vue2中，给已声明对象添加新属性，对象值会更改但不会引起页面渲染；因为新增属性没有通过 Object.defineProperty 设置成响应式数据；

### 解决方案

- Vue.set()
Vue.set( target, propertyName/index, value )

通过Vue.set向响应式对象中添加一个property，并确保这个新 property同样是响应式的，且触发视图更新
- Object.assign()
创建一个新的对象，合并原对象和混入对象的属性,引起页面刷新
this.data1 = Object.assign({},this.data1,{name:1})
- $forcecUpdated()
强制页面重新渲染，不是很推荐